import { useState } from "react"
import { Navigate } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import useData from "../../../services/getData";

import Clouds from "./Clouds";

import "../styles/AdministrativePanel.scss"

const AdministrativePanel = ({changeAuthType}) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthored, setIsAuthored] = useState(null);
    const [errorMessage, setErrorMessage] = useState("Неверный логин или пароль!");
    const {loading, setEmployees} = useData();

    const changeStateValue = (e) => {
        setIsAuthored(null);

        switch(e.target.id){
            case "login": setLogin(e.target.value); break;
            default: setPassword(e.target.value); break;
        }
    }

    const goToAccount = () => {
        setIsAuthored(false);

        checkAuth([{login: "admin", password: "admin"}], "employer")

        setEmployees({login, password})
        .then(res => {
            if(res.code === 100){
                setIsAuthored("employee");
                changeAuthType("employee", {id: res.id, login});
            } else if (res.code === 400){
                setErrorMessage("Вы были отключены!")
            }
        })
    }

    const checkAuth = (list, type) => {
        list.forEach((item)=>{
            if(item.login === login && item.password === password){
                setIsAuthored(type);
                changeAuthType(type, {name: item.name, login: item.login, password: item.password});
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
            
            {isAuthored ? <Navigate to = {`/${isAuthored}`} replace = {true} /> : null}

        </div>
    )

}

export default AdministrativePanel;