import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import { changeEmployeeData, changeError } from "./EmployeeModalSlice";
import { toggleEmployeeAdded } from "../EmployerComponents/EmployerSlice";

import useData from "../../services/getData";

import "./EmployeeModal.scss"

const EmployeeModal = ({toggleModal, Modal}) => {

    const {name, login, password, isError} = useSelector(state => state.employeeModal);
    const dispatch = useDispatch();
    const { setEmployees } = useData();

    const changeStateValue = (e) => {
        const elem = e.target;
        dispatch(changeError(false))
        dispatch(changeEmployeeData({name: elem.id, value: elem.value}));
    }

    const submitData = () => {
        const dataToSend = { name, login, password }
        setEmployees(dataToSend)
        .then(res => {
            if(res.code === 200){
                dispatch(toggleEmployeeAdded())
                toggleModal();
            }
            else
                dispatch(changeError(true))
        })
    }

    const error = isError ? <span style = {{display: "block", fontWeight: 600, color: "#800000", margin: "10px 0", textAlign: "center"}}>Сотрудник с таким логином уже существует!</span> : null
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

                <Button 
                    onClick={submitData} 
                    className="button_task" 
                    disabled = {name === "" || login === "" || password === ""}>Создать!</Button>

            </form>
            {error}
        </Modal>
    )
}

export default EmployeeModal;