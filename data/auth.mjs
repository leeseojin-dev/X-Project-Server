import MongoDB from "mongodb"
import { getUsers } from "../db/database.mjs"

const ObjectId = MongoDB.ObjectId

// 회원 중복 체크
export async function findByUserid(userid) {
    // next(): 다음 함수로 연결
    return getUsers().find({ userid }).next().then(mapOptionalUser) 
} 

// 회원 가입
export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => result.insertedId.toString())
}

// 로그인 유지
export async function findById(id) {        // Objectid를 의미
    return getUsers().find({ _id: new ObjectId(id) }).next().then(mapOptionalUser)
}

function mapOptionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user
}
