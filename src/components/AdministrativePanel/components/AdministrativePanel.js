import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleAuthType, changeErrorMessage, changeFormValue, clearPanel } from "../AdministativePanelSlice";
import { changeAuthType } from "../../App/appSlice";

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import useData from "../../../services/getData";

import Clouds from "./Clouds";
import "../styles/AdministrativePanel.scss"

const AdministrativePanel = () => {

    const {login, password, errorMessage, isAuthored} = useSelector(state => state.administrativePanel);
    const dispatch = useDispatch();
    const {loading, setEmployees} = useData();
    const navigate = useNavigate();

    const changeStateValue = (e) => {
        dispatch(toggleAuthType(null));
        dispatch(changeFormValue({name: e.target.id, value: e.target.value}));
    }

    const goToAccount = () => {
        dispatch(toggleAuthType(false));
        checkAuth([{login: "admin", password: "admin"}], "employer")

        setEmployees({login, password})
        .then(res => {
            if(res.code === 100){
                dispatch(toggleAuthType("employee"));
                dispatch(changeAuthType({type: "employee", data: {id: res.id, login}}))
                navigate("/employee");
                dispatch(clearPanel());
            } else if (res.code === 400){
                dispatch(changeErrorMessage("Вы были отключены!"))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const checkAuth = (list, type) => {
        list.forEach((item)=>{
            if(item.login === login && item.password === password){
                dispatch(toggleAuthType(type));
                dispatch(changeAuthType({type, data: {
                    name: item.name, 
                    login: item.login, 
                    password: item.password
                }}))
                navigate("/" + type);
                dispatch(clearPanel());
            }
        })
    }


    const isLoading = loading ? <Spinner animation="border" variant="primary" /> : null;
    const isWrongAuth = isAuthored === false && !loading ? <p className="auth_error">{errorMessage}</p> : null;

    return (
        <div className="admin_panel">
            <Clouds />
            <div className="admin_window">
                <div className="admin_window__title">Авторизация</div>
                <hr />

                {isWrongAuth}
                <form action="#" className="admin_window__form">
                    <div className="admin_window__form-wrapper">
                        <input 
                            value={login} 
                            onChange={changeStateValue} 
                            id="login" 
                            type="text" 
                            className="admin__form-login" 
                            placeholder="Логин"/>                        
                    </div>


                    <div className="admin_window__form-wrapper">
                        <input 
                            value={password} 
                            onChange={changeStateValue} 
                            id="password" 
                            type="password" 
                            className="admin__form-password" 
                            placeholder="Пароль"/>                        
                    </div>

                    <Button onClick={goToAccount} className="admin__form-submit" variant="primary" size="lg">
                        Войти!
                    </Button>
                    
                    {isLoading}
                </form>
            </div>
        </div>
    )

}

export default AdministrativePanel;