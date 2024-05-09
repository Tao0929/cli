import { addTodo } from '@/store/todosReducer'
import { useDispatch } from 'react-redux'

const AddTodo = () => {
  let input
  const dispatch = useDispatch()
  const handleAddTodo = (e) => {
    e.preventDefault()
    if (!input.value.trim()) return
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

export default AddTodo