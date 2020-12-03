import { EMPTY_METADATA_KEY, INVALID_INPUT, INSUFFICIENT_ACCOUNT_PERMISSIONS } from '../config/ErrorCode'
import { GET, POST } from '../config/constants'
export const isEmptyObject = (obj) => {
  for (const n in obj) { return false }
  return true
}
export const checkReqData = (data) => {
  const checkReqType = isEmptyObject(data.query) ? POST : GET
  let req = null
  console.log(checkReqType, data.body)
  if (checkReqType === POST) {
    req = data.body
  } else {
    req = data.query
  }
  return new Promise((resolve, reject) => {
    if (isEmptyObject(req)) {
      /*eslint-disable*/
      reject({
        message: EMPTY_METADATA_KEY.des,
        data: 'NO DATA',
        code: EMPTY_METADATA_KEY.code,
        status: false
      })
    } else {
      resolve(req)
    }
  })
}
export const isDataExist = (options) => {
  return new Promise((resolve, reject) => {
    options.model.findOne(options.param, function (error, info) {
      if (error) {
        reject(new Error(JSON.stringify({
          message: INVALID_INPUT.des,
          data: 'NO DATA',
          code: INVALID_INPUT.code,
          status: false
        })))
      } else {
        if (info) {
          /*eslint-disable*/
          reject({
            message: INSUFFICIENT_ACCOUNT_PERMISSIONS.des,
            data: 'NO DATA',
            code: INSUFFICIENT_ACCOUNT_PERMISSIONS.code,
            status: false
          })
        } else {
          console.log('1111')
          resolve({message:'success'})
        }
      }
    })
  })
}
