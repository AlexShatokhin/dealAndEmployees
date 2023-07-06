import { useState } from "react"
import { Navigate, Link } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import useData from "../../services/getData";

import "./AdministrativePanel.scss"

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
                changeAuthType(type, {name: item.name});
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
            <label htmlFor="name">Имя</label>
            <input 
            value={name} 
            onChange={changeStateValue} 
            id="name" 
            type="text" 
            className="admin__form-name" />                        
        </div>

        <div className="admin_window__form-wrapper">
            <label htmlFor="login">Логин</label>
            <input 
            value={login} 
            onChange={changeStateValue} 
            id="login" 
            type="text" 
            className="admin__form-login" />                        
        </div>



        <div className="admin_window__form-wrapper">
            <label htmlFor="password">Пароль</label>
            <input 
            value={password} 
            onChange={changeStateValue} 
            id="password" 
            type="password" 
            className="admin__form-password" />                        
        </div>

    
        <Button onClick={createAccount} className="admin__form-submit" variant="primary" size="lg">
            Создать аккаунт
        </Button>
        
        {isLoading}
    </form>

    : (
        <form action="#" className="admin_window__form">

            <div className="admin_window__form-wrapper">
                <label htmlFor="login">Логин</label>
                <input 
                value={login} 
                onChange={changeStateValue} 
                id="login" 
                type="text" 
                className="admin__form-login" />                        
            </div>



            <div className="admin_window__form-wrapper">
                <label htmlFor="password">Пароль</label>
                <input 
                value={password} 
                onChange={changeStateValue} 
                id="password" 
                type="password" 
                className="admin__form-password" />                        
            </div>

            
            <Button onClick={goToAccount} className="admin__form-submit" variant="primary" size="lg">
                Войти!
            </Button>
            
            {isLoading}
        </form>
    )

    return (
        <div className="admin_panel">
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