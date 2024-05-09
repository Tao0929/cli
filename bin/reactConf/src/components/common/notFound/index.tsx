import { Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigator = useNavigate()
    const {isLogin} = useSelector((state: any) => state.login)
    return ( 
        <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>404页面找不到！</div>
            <Button type='primary' style={{marginTop: 20}} onClick={() => {
                navigator(isLogin?"/":'/login')
            }}>去首页
            </Button>
        </div>
     );
}
 
export default NotFound;