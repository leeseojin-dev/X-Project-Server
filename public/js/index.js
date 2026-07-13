window.onload = function () {
    document.getElementById("loginForm").addEventListener("submit", async(e) => {
        e.preventDefault()
        await sendit()
    })
}

async function sendit() {
    const userid = document.getElementById("userid")
    const password = document.getElementById("password")

    if(userid.value === "") {
        alert("아이디를 입력하세요")
        userid.focus()
        return false
    }

    if(password.value === "") {
        alert("비밀번호를 입력하세요")
        password.focus()
        return false
    }

    try {
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userid: userid.value,
                password: password.value
            })
        })

        const data = await res.json()

        if(!res.ok) {
            alert(data.message || "아이디 또는 비밀번호가 일치하지 않습니다")
            return false
        }

        localStorage.setItem("token", data.token)
        alert("로그인 성공")
        location.href = "/posts.html"

    } catch (err) {
        console.log("로그인 서버 통신 오류")
        console.log(err)
        alert("서버와 통신 중 오류가 발생했습니다")
    }
}
