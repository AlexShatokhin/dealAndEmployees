import { useState } from "react"

import Button from 'react-bootstrap/Button';

import useModal from "../../../hooks/useModal";
import useData from "../../../services/getData"



const AddModal = ({changeShowModal, changeEmployeeAdded, Modal}) => {

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

        changeShowModal();
        setEmployees(dataToSend);
        changeEmployeeAdded();

    }


    return (
        <Modal>
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
        </Modal>
    )
}

const AddEmployee = ({changeEmployeeAdded}) => {

    const {Modal, toggleModal, isShowModal} = useModal()

    return ( 
        <>
            <Button variant="primary" className="btn_add" onClick={toggleModal}>Добавить работника...</Button>
            {isShowModal ? <AddModal 
            Modal = {Modal} 
            changeEmployeeAdded = {changeEmployeeAdded} 
            changeShowModal = {toggleModal} /> : null}
        </>
    )

}

export default AddEmployee;