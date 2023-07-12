import { useState } from "react"
import { Navigate } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import useData from "../../services/getData";

import "./AdministrativePanel.scss"
//import "./Stars.sass"
import "./Clouds.css"

const AdministrativePanel = ({changeAuthType}) => {

    const [createdMode, setCreatedMode] = useState(false);
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthored, setIsAuthored] = useState(null);
    const {loading, error, getEmployers, getEmployees, setEmployees} = useData();

    const changeStateValue = (e) => {
        setIsAuthored(null);

        switch(e.target.id){
            case "login": setLogin(login => e.target.value); break;
            case "name": setName(name => e.target.value); break;
            default: setPassword(password => e.target.value); break;
        }
    }

    const goToAccount = (e) => {
        setIsAuthored(false);

        getEmployers()
        .then(res => checkAuth(res, "employer"))

        getEmployees()
        .then(res => checkAuth(res, "employee"))    
    }

    const checkAuth = (list, type) => {
        list.forEach((item)=>{
            if(item.login == login && item.password == password){
                setIsAuthored(type);
                changeAuthType(type, {name: item.name, login: item.login, password: item.password});
            }
                
        })
    }

    const onChangeMode = () => {
        setCreatedMode(!createdMode);
    }

    const createAccount = () => {
        if(name === "" || login === "" || password === "")
            setIsAuthored(false);
        else {
            setEmployees({name, login, password})
            onChangeMode();
        }

    }

    const isLoading = loading ? <Spinner animation="border" variant="primary" /> : null;
    const isWrongAuth = isAuthored === false && !loading ? <p className="auth_error">Неверный логин или пароль!</p> : null;
    const panelForm = createdMode ? 

    <form action="#" className="admin_window__form">

        <div className="admin_window__form-wrapper">
            <input 
            value={name} 
            onChange={changeStateValue} 
            id="name" 
            type="text" 
            className="admin__form-name" 
            placeholder="Имя"/>                        
        </div>

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

    
        <Button onClick={createAccount} className="admin__form-submit" variant="primary" size="lg">
            Создать аккаунт
        </Button>
        
        {isLoading}
    </form>

    : (
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
    )

    return (
        <div className="admin_panel">
            <div className="background">
            <div id="Clouds">
                <div class="Cloud Foreground"></div>
                <div class="Cloud Background"></div>
                <div class="Cloud Foreground"></div>
                <div class="Cloud Background"></div>
                <div class="Cloud Foreground"></div>
                <div class="Cloud Background"></div>
                <div class="Cloud Background"></div>
                <div class="Cloud Foreground"></div>
                <div class="Cloud Background"></div>
                <div class="Cloud Background"></div>
                </div>

                <svg version="1.1" id="Layer_1" x="0px" y="0px"
                    width="40px" height="24px" viewBox="0 0 40 24" >
                <defs>
                    <path id="Cloud" d="M33.85,14.388c-0.176,0-0.343,0.034-0.513,0.054c0.184-0.587,0.279-1.208,0.279-1.853c0-3.463-2.809-6.271-6.272-6.271
                    c-0.38,0-0.752,0.039-1.113,0.104C24.874,2.677,21.293,0,17.083,0c-5.379,0-9.739,4.361-9.739,9.738
                    c0,0.418,0.035,0.826,0.084,1.229c-0.375-0.069-0.761-0.11-1.155-0.11C2.811,10.856,0,13.665,0,17.126
                    c0,3.467,2.811,6.275,6.272,6.275c0.214,0,27.156,0.109,27.577,0.109c2.519,0,4.56-2.043,4.56-4.562
                    C38.409,16.43,36.368,14.388,33.85,14.388z"/>
                </defs>
                </svg> 
            </div>
            
            <div className="admin_window">
                <p onClick={onChangeMode} className="create_account">{createdMode ? "Войти в аккаунт" : "Создать аккаунт"}</p>
                <div className="admin_window__title">Авторизация</div>
                <hr />

                {isWrongAuth}
                {panelForm}
            </div>
            
            {isAuthored ? <Navigate to = {`/${isAuthored}`} replace = {true} /> : null}

        </div>
    )

}

export default AdministrativePanel;