import jwt from "jsonwebtoken"
import { config } from "../config.mjs"
import * as authRepository from "../data/auth.mjs"

const AUTH_ERROR = { message: "인증에러" }

// 로그인 유지 체크
// next(): 해당 코드 실행 후 다음으로 존재하는 미들웨어로 넘어가게 연결
export const isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization")
    console.log(authHeader)     // authHeader 내용 출력

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("헤더에러")
        return res.status(401).json(AUTH_ERROR)
    }

    // authHeader
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDVmNjk1OWQ1ZDQxNTVhODc1MGRkMiIsImlhdCI6MTc4MzAzODA0MSwiZXhwIjoxNzgzMTI0NDQxfQ.j-a_-TNpuBG93kFTCuThp6t18wXNN9eANCcjsWDDzZ0

    // 토큰 분리
    const token = authHeader.split(" ")[1]      // Bearer 뒤의 토큰만 가져옴
    // token과 secretKey를 받아서 복호화
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if(error) {
            console.log("토큰에러")
            return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decoded)     // decoded 출력하면 객체로 출력됨
        // req.id = decoded?.id     // ? : decoded가 없어도 undefined로 반환하도록 해줌
        const user = await authRepository.findById(decoded.id)
        if(!user) {
            console.log("해당 아이디 없음")
            return res.status(401).json(AUTH_ERROR)
        }
        console.log("user.id: ", user.id)
        console.log("user.userid:", user.userid)
        req.id = user.id
        req.token = token
        next()
    })
}
