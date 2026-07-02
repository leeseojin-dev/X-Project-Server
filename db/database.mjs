import MongoDB from "mongodb"
import { config } from "../config.mjs"

let db

// Xdb 데이터베이스 접근
export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host).then((client) => {
        db = client.db("Xdb")
    })
}

// users 컬렉션 객체 접근
export function getUsers() {
    return db.collection("users")
}

// posts 컬렉션 객체 접근
export function getPosts() {
    return db.collection("posts")
}