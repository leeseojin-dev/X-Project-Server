window.onload = function () {
    const token = localStorage.getItem("token")
    if(!token) {
        alert("로그인이 필요합니다")
        location.href = "/index.html"
        return false
    }

    document.getElementById("postForm").addEventListener("submit", async(e) => {
        e.preventDefault()
        await writePost()
    })

    document.getElementById("filterForm").addEventListener("submit", async(e) => {
        e.preventDefault()
        const userid = document.getElementById("filterUserid").value
        await loadPosts(userid)
    })

    document.getElementById("resetBtn").addEventListener("click", async() => {
        document.getElementById("filterUserid").value = ""
        await loadPosts()
    })

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token")
        location.href = "/index.html"
    })

    loadPosts()
}

// 전체 게시글 출력 (userid가 있으면 특정 사용자 글만)
async function loadPosts(userid) {
    const token = localStorage.getItem("token")
    const postList = document.getElementById("postList")

    try {
        const url = userid ? `/post?userid=${encodeURIComponent(userid)}` : "/post"
        const res = await fetch(url, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })

        const data = await res.json()

        if(!res.ok) {
            alert(data.message || "게시글을 불러오지 못했습니다")
            return false
        }

        if(data.length === 0) {
            postList.innerHTML = "<li>게시글이 없습니다</li>"
            return
        }

        postList.innerHTML = data.map((post) => {
            return `
                <li class="postItem">
                    <div class="postHead">
                        <span class="postName">${post.name}</span>
                        <span class="postUserid">@${post.userid}</span>
                        <span class="postTime">${formatTime(post.createdAt)}</span>
                    </div>
                    <p class="postText">${post.text}</p>
                </li>
            `
        }).join("")

    } catch (err) {
        console.log("게시글 조회 서버 통신 오류")
        console.log(err)
        alert("서버와 통신 중 오류가 발생했습니다")
    }
}

// 게시글 작성 (로그인 사용자만, 작성 후 자동 새로고침)
async function writePost() {
    const token = localStorage.getItem("token")
    const text = document.getElementById("text")

    if(text.value === "") {
        alert("내용을 입력하세요")
        text.focus()
        return false
    }

    try {
        const res = await fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                text: text.value
            })
        })

        const data = await res.json()

        if(!res.ok) {
            alert(data.message || "게시글 작성에 실패했습니다")
            return false
        }

        text.value = ""
        location.reload()

    } catch (err) {
        console.log("게시글 작성 서버 통신 오류")
        console.log(err)
        alert("서버와 통신 중 오류가 발생했습니다")
    }
}

function formatTime(iso) {
    const d = new Date(iso)
    const pad = (n) => String(n).padStart(2, "0")
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}