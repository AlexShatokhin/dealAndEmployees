import { useState } from "react";
import { Button } from "react-bootstrap";

import useData from "../../services/getData";

import "./EmployeeModal.scss"

const EmployeeModal = ({changeEmployeeAdded, toggleModal, Modal}) => {

    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const{loading, setEmployees} = useData();

    const changeStateValue = (e) => {
        const elem = e.target;

        switch(elem.id){
            case "login": setLogin(elem.value); break;
            case "name": setName(elem.value); break;
            default: setPassword(elem.value); break;
        }
    }

    const submitData = () => {

        const dataToSend = { name, login, password }

        toggleModal();
        setEmployees(dataToSend)
        .then(changeEmployeeAdded)
        

    }


    return (
        <Modal>
            <form action="#" className="popup__form">

                <div className="admin_window__form-wrapper">
                    <input 
                    value={name} 
                    onChange={changeStateValue} 
                    id="name" 
                    type="text" 
                    className="admin__form-name" 
                    placeholder="Введите имя..."/>                        
                </div>

                <div className="admin_window__form-wrapper">
                    <input 
                    value={login} 
                    onChange={changeStateValue} 
                    id="login" 
                    type="text" 
                    className="admin__form-login" 
                    placeholder="Введите логин..."/>                        
                </div>

                <div className="admin_window__form-wrapper">
                    <input 
                    value={password} 
                    onChange={changeStateValue} 
                    id="password" 
                    type="password" 
                    className="admin__form-password" 
                    placeholder="Введите пароль..."/>                        
                </div>

                <Button onClick={submitData} className="button_task" disabled = {name == "" || login == "" || password == ""}>Создать!</Button>

            </form>
        </Modal>
    )
}

export default EmployeeModal;