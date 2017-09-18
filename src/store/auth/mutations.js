import { USER_INFO } from './keys'
export default {
  // 获取登录用户信息
  [USER_INFO] (state, data) {
    console.log('user', data)
    state.profile = data
  }
}
