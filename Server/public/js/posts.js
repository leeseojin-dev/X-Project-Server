window.onload = function () {
    const token = localStorage.getItem("token")
    if(!token) {
        alert("로그인이 필요합니다")
        location.href = "/index.html"
        return false
    }
    loadPosts()
}

async function loadPosts() {
    const token = localStorage.getItem("token")
    
}