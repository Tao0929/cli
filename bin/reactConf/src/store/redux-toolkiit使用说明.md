<!-- 使用说明 -->
1. src目录创建 store 仓库 - src - index.ts
```
<!-- 仓库配置 -->
import { configureStore } from '@reduxjs/toolkit'

<!-- 业务reducer -->
import todosReducer from './todosReducer'
import visibilityFilterReducer from './visibilityFilterReducer'
 
<!-- 导出仓库 -->
const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: visibilityFilterReducer
  }
})
 
export default store;
```
2. 业务reducer 如何定义使用？
```
import { createSlice } from "@reduxjs/toolkit"
 
let nextTodoId = 0
const todosReducer = createSlice({
  // reducer名称
  name: 'todos',
  // 初始数据状态
  initialState: {
    todos:[]
  },
  // 修改数据的方法
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
```

3. 实际业务组件如何使用？
```
<!-- 引入action方法 -->
import { addTodo } from '@/store/todosReducer'
<!-- 引入useDispatch方法，用于事件派发 -->
import { useDispatch } from 'react-redux'

const AddTodo = () => {
  let input
  const dispatch = useDispatch()
  const handleAddTodo = (e) => {
    e.preventDefault()
    if (!input.value.trim()) return
    <!-- 派发事件 addTodo 从而修改数据源 -->
    dispatch(addTodo(input.value))
    input.value = ''
  }
  return (
    <div>
      <form onSubmit={(e)=>handleAddTodo(e)}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo;


import Todo from './Todo'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTodo } from '@/store/todosReducer'
import { VisibilityFilters } from '@/store/filter'

const TodoList = () => {
  const dispatch = useDispatch()
  const {todos} = useSelector(state => state.todos)
  const {filter} = useSelector(state => state.filter)

  const getFiltertodos = (todos, filter) => {
    switch (filter) { 
      case VisibilityFilters.SHOW_ALL:
        return todos
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(item => item.completed === false)
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(item => item.completed === true)
      default:
        return todos
    }
  }
  const visibilityTodos = getFiltertodos(todos, filter)
  return (
    <ul>
      {visibilityTodos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={()=>dispatch(toggleTodo(todo.id))}
        />
      )}
    </ul>
  )
}

export default TodoList

```

总结一下:

1. 第一步 - 创建仓库
<!-- 配置仓库 - 导出所有的业务reducers -->
import { configureStore } from '@reduxjs/toolkit'
configureStore - [ reducer ]
2. 第二步 - 创建业务 reducer
<!-- 创建业务切片 -->
import { createSlice } from "@reduxjs/toolkit"
<!-- 命名空间， 初始数据，更改数据源的事件行为定义 -->
createSlice - [name, initialState, reduers(actions)]

3. 第三步 - 业务使用

<!-- 数据源获取，事件派发器 -->
import { useSelector, useDispatch } from 'react-redux'
<!-- 业务导出的actions -->
import { toggleTodo } from '@/store/todosReducer'

<!-- 事件派发器 -->
const dispatch = useDispatch()

<!-- store - 数据源获取 -->
const {todos} = useSelector(state => state.todos)
const {filter} = useSelector(state => state.filter)

<!-- 对actions事件进行派发 -->
onClick={()=>dispatch(toggleTodo(todo.id))}
