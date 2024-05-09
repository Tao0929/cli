import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logIn, } from "@/store/isLoginReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlyingBird from "../bird";

const LoginComp = () => {
    
    const dispatch = useDispatch()
    const {isLogin} = useSelector((state: any) => state.login)
    const navigator = useNavigate()
    useEffect(() => {
        if (isLogin) navigator('/')
    }, [isLogin])

    return ( 
        <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>请登录!</div>
            <FlyingBird />
            <Button type='primary' style={{marginTop: 20}} onClick={() => {
                dispatch(logIn(isLogin))
            }}>去登录</Button>
        </div>
     );
}
 
export default LoginComp;