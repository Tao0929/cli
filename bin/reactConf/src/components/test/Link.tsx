import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@/store/visibilityFilterReducer'

const Link = ({ children, filter}) => {
  const dispatch = useDispatch()
  const {filter:activeFilter} = useSelector(state => state.filter)
  const active = activeFilter === filter
  return(
    <button
      onClick={()=>dispatch(setFilter(filter))}
      disabled={active}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  )
}

export default Link