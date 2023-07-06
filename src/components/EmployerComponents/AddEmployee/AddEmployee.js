import { useEffect, useState } from "react"

import Button from 'react-bootstrap/Button';

import useData from "../../../services/getData"



const Modal = ({changeShowModal, changeEmployeeAdded}) => {

    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const{loading, setEmployees} = useData();

    const changeStateValue = (e) => {

        switch(e.target.id){
            case "login": setLogin(login => e.target.value); break;
            case "name": setName(name => e.target.value); break;
            default: setPassword(password => e.target.value); break;
        }
    }

    const submitData = () => {
        if(name == "" && login == "" && password == ""){
            //setCheckValue(false);
        } else {
            const dataToSend = {
                name, login, password
            }
            changeShowModal();
            setEmployees(dataToSend);
            changeEmployeeAdded();
        }

    }


    return (
        <div onClick={(e)=>{return e.target.classList.contains("popup")? changeShowModal() : null}} className="popup">
            <div className="popup_content">
                <div onClick={changeShowModal} className="close_btn">&#10010;</div>
                <div className="popup__title">Добавить работника</div>
                <hr />



                <form action="#" className="popup__content">

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

                    <Button onClick={submitData} className="button_task" disabled = {loading}>Создать!</Button>


                </form>
            </div>

        </div>
    )
}

const showMsg = ({changeShowModal}) => {


    return (
        <div style={{backgroundColor: "#FFFFFF", borderRadius: "5px", padding: "10px", margin: "40vh auto"}}>
            <div onClick={changeShowModal} className="close_btn">&#10010;</div>
            <p>Задание создано!</p>
        </div>
    )
}

const AddEmployee = ({changeEmployeeAdded}) => {

    const [showModal, setShowModal] = useState(false);

    const changeShowModal = () => {
        setShowModal(!showModal);
    }

    return ( 
        <>
            <Button variant="primary" className="btn_add" onClick={changeShowModal}>Добавить работника...</Button>
            {showModal ? <Modal changeEmployeeAdded = {changeEmployeeAdded} changeShowModal = {changeShowModal} /> : null}
        </>

    )

}

export default AddEmployee;