import { VisibilityFilters } from './filter'
import { createSlice } from "@reduxjs/toolkit"
const filterReducer = createSlice({
  name: 'filter',
  // 初始状态
  initialState: {
    filter: VisibilityFilters.SHOW_ALL
  },
  // 修改数据的方法
  reducers: {
    setFilter(state,action) {
      state.filter = action.payload
    }
  }
})
 
export const { setFilter } = filterReducer.actions
 
export default filterReducer.reducer