import './App.less'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './route/index.js'


function App() {
  return (
    <RouterProvider
        router={router}
        fallbackElement={<>spining...</>}
        
    />
  )
}

export default App
