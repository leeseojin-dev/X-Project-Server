import * as postRepository from "../data/posts.mjs"

// 포스트 쓰기
// 포스트를 작성하는 함수
export async function createPost(req, res) {
    const { text } = req.body           // 사용자 정보는 header에
    const post = await postRepository.create(text, req.id)      // isAuth를 들렀다 오기 때문에 req.id가 isAuth에서 req.id를 가져올 수 있음
    res.status(201).json(post)
} 

// 전체 포스트 가져오기
// 모든 포스트를 가져오는 함수
export async function getPosts(req, res) {
    const userid = req.query.userid
    const data = await (userid ? postRepository.getAllByUserid(userid) : postRepository.getAll())
    res.status(200).json(data)
}

// 글번호에 대한 포스트 가져오기
// 글번호(id)로 포스트를 가져오는 함수
export async function getPost(req, res) {
    const id = req.params.id
    const post = await postRepository.getById(id)
    if(post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: `${id}의 포스트가 없습니다` })
    }
}

// 포스트 수정하기
// 포스트를 수정하는 함수
export async function updatePost(req, res) {
    const id = req.params.id
    const text = req.body.text
    const post = await postRepository.getById(id)
    if(!post) {
        return res.status(404).json({ message: `${id}의 포스트가 없습니다` })
    }
    if(post.idx !== req.id) {
        return res.sendStatus(405)
    }
    const updated = await postRepository.update(id, text)
    res.status(200).json(updated)
}

// 포스트 삭제하기
// 포스트를 삭제하는 함수
export async function deletePost(req, res) {
    const id = req.params.id
    // 포스트를 삭제하기 전에 결과로 포스트를 보내주기 위해 미리 데이터를 가져옴
    const post = await postRepository.getById(id)

    // 아이디 유효성 검사
    if(!post) {
        console.log("포스터가 존재하지 않습니다")
        return res.status(404).json({ message: `${id}의 포스트가 없습니다` })
    } 
    if(post.idx !== req.id) {           // 글쓴이와 로그인한 사용자가 다르다면
        return res.sendStatus(403)      // 403: 보낼 데이터가 없음
    }
    await postRepository.remove(id)
    res.sendStatus(204)         // 204: 정상적인 호출이지만 내용 없음

}