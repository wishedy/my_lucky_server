// 引入模块依赖
import { TOKEN_SECRET_KEY, TOKEN_EXPIRATION } from '../config/constants'
const jwt = require('jsonwebtoken')
// 创建 token 类
const Jwt = {
  data: null,
  _id: null, // 用户自定义 存放userid
  _date: null, // 过期时间
  _creatDate: null, // 创建时间

  // 重新生成 token
  refreshToken () {
    const data = this.data
    const created = Math.floor(Date.now() / 1000)
    const cert = TOKEN_SECRET_KEY
    const token = jwt.sign({
      data,
      exp: created + 60 * TOKEN_EXPIRATION, // 过期时间
      iat: created // 创建时间
    }, cert, { algorithm: 'RS256' })
    return token
  },

  // 生成token
  generateToken (data) {
    console.log('1212')
    if (data) {
      this.data = data
    }
    const payload = this.data
    const created = Math.floor(Date.now() / 1000)
    const cert = TOKEN_SECRET_KEY// 私钥 可以自己生成
    const token = jwt.sign({
      payload,
      exp: created + 60 * TOKEN_EXPIRATION, // 过期时间 30 分钟
      iat: created // 创建时间
    }, cert)
    console.log(token)
    return token
  },

  // 校验token
  verifyToken (data) {
    if (data) {
      this.data = data
    }
    const token = this.data
    let res
    try {
      const result = jwt.verify(token, TOKEN_SECRET_KEY) || {}
      this._id = result.data
      this._date = result.exp
      this._creatDate = result.iat
      const { exp = 0 } = result; const current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = result.data || {}
      }
    } catch (e) {
      res = 'err'
    }
    return res
  }
}

module.exports = Jwt
