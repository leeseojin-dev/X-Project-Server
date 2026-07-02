import express from "express"
import * as authController from "../controller/auth.mjs"

const router = express.Router()

// 회원가입
// http://127.0.0.1:8080/auth/signup (POST)
router.post("/signup", authController.signup)


// 로그인
// http://127.0.0.1:8080/auth/login (POST)
router.post("/login", authController.login)


// 로그인 유지 체크
// http://127.0.0.1:8080/auth/me (GET)
router.get("/me", authController.me)


export default router
