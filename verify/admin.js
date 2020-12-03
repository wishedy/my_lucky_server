import moment from 'moment'
import { nanoid } from 'nanoid'
const JWT = require('../middlewares/JWT')
export const verifyRegister = (data) => {
  const grade = data.grade
  const email = data.email
  const phoneNum = data.phoneNum
  const realName = data.realName
  const gender = data.gender
  const identityNum = data.identityNum
  const passWord = data.passWord
  const adminId = nanoid()
  const createTime = moment().format('YYYY-MM-DD HH:mm:ss')
  const newData = {
    user_name: realName,
    password: passWord,
    identity_num: identityNum,
    id: adminId,
    gender: parseInt(gender, 10), // 0女1男
    create_time: createTime,
    email: email,
    phone_number: phoneNum,
    grade: parseInt(grade, 10) // 1:普通管理、 2:超级管理员
  }
  return {
    response: {
      message: '注册成功',
      data: {
        adminId: adminId,
        token: JWT.generateToken({ id: adminId, passWord: passWord, user_name: realName }),
        adminName: realName,
        createTime: createTime
      },
      code: 200, // 注册成功
      status: true
    },
    result: newData
  }
}
