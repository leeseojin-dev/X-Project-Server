window.onload = function () {
    document.getElementById("signupForm").addEventListener("submit", async(e) => {
        e.preventDefault()
        await sendit()
    })
}

const expIdText = /^[A-Za-z0-9]{4,20}$/     // userid: 4자이상 20자 이하의 영문자 또는 숫자
const expPwTest = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/    // userpw: 8자이상 20자 이하의 영문자, 숫자, 특수문자 포함
const expEmailTest = /^[A-Za-z0-9\-\.]+@[A-Za-z0-9\-]+\.[A-Za-z]+$/

async function sendit() {
    const userid = document.getElementById("userid")
    const password = document.getElementById("password")
    const name = document.getElementById("name")
    const email = document.getElementById("email")

    if(userid.value === "") {
        alert("아이디를 입력하세요")
        userid.focus()
        return false
    }

    if(!expIdText.test(userid.value)) {
        alert("아이디는 4자 이상 20자 이하의 영문자 또는 숫자로 입력하세요")
        userid.focus()
        return false
    }

    if(password.value === "") {
        alert("비밀번호를 입력하세요")
        password.focus()
        return false
    }

    if(!expPwTest.test(password.value)) {
        alert("비밀번호는 8자 이상 20자 이하이며 영문자, 숫자, 특수문자를 포함해야 합니다")
        password.focus()
        return false
    }

    if(name.value === "") {
        alert("이름을 입력하세요")
        name.focus()
        return false
    }
    
    if(email.value === "") {
        alert("이메일을 입력하세요")
        email.focus()
        return false
    }

    if(!expEmailTest.test(email.value)) {
        alert("이메일 형식이 올바르지 않습니다")
        email.focus()
        return false
    }

    try {
        const res = await fetch("/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                userid: userid.value,
                password: password.value,
                name: name.value,
                email: email.value
            })
        })

        const data = await res.json()

        if(!res.ok) {
            alert(data.message || "회원가입에 실패했습니다")
            return false
        }

        localStorage.setItem("token", data.token)
        alert("회원가입이 완료되었습니다")
        location.href = "/index.html"
    } catch (err) {
        console.log("회원가입 서버 통신 오류")
        console.log(err)
        alert("서버와 통신 중 오류가 발생했습니다")
    }
}
