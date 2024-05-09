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