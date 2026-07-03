import * as postRepository from "../data/posts.mjs"

// 포스트를 작성하는 함수
export async function createPost(req, res) {
    const { text } = req.body           // 사용자 정보는 header에
    const post = await postRepository.create(text, req.id)      // isAuth를 들렀다 오기 때문에 req.id가 isAuth에서 req.id를 가져올 수 있음
    res.status(201).json(post)
} 