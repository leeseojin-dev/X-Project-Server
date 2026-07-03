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
// 글 번호(id)로 포스트를 가져오는 함수
export async function getPost(req, res) {
    const id = req.params.id
    const post = await postRepository.getById(id)
    if(post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: `${id}의 포스트가 없습니다` })
    }
}
