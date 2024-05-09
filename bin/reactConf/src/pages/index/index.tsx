import AddTodo from "@/components/test/AddTodo";
import TodoList from "@/components/test/TodoList";
import Footer from "@/components/test/Footer";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/store/isLoginReducer";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const {isLogin} = useSelector((state: any) => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return ( 
        <>
            <div style={{marginTop: 20}}>
                <AddTodo />
                <TodoList />
                <Footer />
            </div>
            <div style={{marginTop: 20}}>
                <Button type='primary' onClick={() => {
                    dispatch(logOut(isLogin))
                    navigate('/login')
                }}>退出登陆</Button>
            </div>
        </>
     );
}
export default Index;