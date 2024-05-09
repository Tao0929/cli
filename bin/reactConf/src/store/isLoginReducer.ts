import { createSlice } from "@reduxjs/toolkit"
import { message } from "antd"
 
let isLoginData = localStorage.getItem('isLogin')
const isLoginReducer = createSlice({
  name: 'login',
  // 初始状态
  initialState: {
    isLogin: isLoginData == '1'
  },
  // 修改数据的方法 【actions】
  reducers: {
    // 添加todo数据
    logOut(state: any, action: any){
      state.isLogin = false
      localStorage.removeItem('isLogin')
      message.success('退出登录成功！')
    },
    // 切换todo数据
    logIn(state, action) { 
      console.log('登录操作')
      state.isLogin = true
      localStorage.setItem('isLogin', '1')
      message.success('登录成功！')
    }
  }
})
 
// 导出 reducer - action 方法
export const {logOut, logIn} =  isLoginReducer.actions

// 导出当前 reducer
export default isLoginReducer.reducer