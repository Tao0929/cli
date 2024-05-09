import React from 'react'
// import FilterLink from '../containers/FilterLink'
import Link from './Link'
import { VisibilityFilters } from '@/store/filter'

const Footer = () => (
  <div>
    <span>Show: </span>
    <Link filter={VisibilityFilters.SHOW_ALL}>
      All
    </Link>
    <Link filter={VisibilityFilters.SHOW_ACTIVE}>
      Active
    </Link>
    <Link filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed
    </Link>
  </div>
)

export default Footer