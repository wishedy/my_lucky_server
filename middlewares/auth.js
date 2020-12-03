import { TOKEN_SECRET_KEY } from '../config/constants'
const expressJwt = require('express-jwt')
module.exports = expressJwt({
  secret: TOKEN_SECRET_KEY,
  algorithms: ['HS256']
}).unless({
  path: [
    '/crm/admin/register',
    /^(?!\/crm\/).*/
  ]// 除了这个地址，其他的URL都需要验证
})
