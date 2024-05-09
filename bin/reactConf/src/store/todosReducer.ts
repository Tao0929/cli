import { createSlice } from "@reduxjs/toolkit"
 
let nextTodoId = 0
const todosReducer = createSlice({
  name: 'todos',
  // 初始状态
  initialState: {
    todos:[]
  },
  // 修改数据的方法 【actions】
  reducers: {
    // 添加todo数据
    addTodo(state: any,action: any){
      state.todos.push({
        text: action.payload,
        id: nextTodoId++,
        completed: false
      })
    },
    // 切换todo数据
    toggleTodo(state, action) { 
      const item = state.todos.find((item: any) => item.id === action.payload)
      item.completed = !item.completed
    }
  }
})
 
// 导出 reducer - action 方法
export const {addTodo, toggleTodo} =  todosReducer.actions

// 导出当前 reducer
export default todosReducer.reducer