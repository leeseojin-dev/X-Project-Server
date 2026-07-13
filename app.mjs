import express from "express"
import { config } from "./config.mjs"
import { connectDB } from "./db/database.mjs"
import authRouter from "./router/auth.mjs"
import postsRouter from "./router/posts.mjs"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 미들웨어
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.use("/auth", authRouter)
app.use("/post", postsRouter)

app.use((req, res) => {
    res.sendStatus(404)
})

// app.listen(config.host.port, () => {
//     console.log("서버 실행 중...")
// })

connectDB().then(() => {
    app.listen(config.host.port, () => {
        console.log("X-Project DB/웹 서버 실행 중 ...")
    })
}).catch(console.error)
