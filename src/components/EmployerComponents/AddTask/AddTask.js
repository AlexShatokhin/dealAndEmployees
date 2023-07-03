import { useEffect, useState } from "react"

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import useData from "../../../services/getData"

import "./AddTask.scss"

const AddTask = () => {

    const [showModal, setShowModal] = useState(false);

    const changeShowModal = () => {
        setShowModal(!showModal);
    }

    return ( 
        <>
            <button onClick={changeShowModal}>Добавить задание...</button>
            {showModal ? <Modal changeShowModal = {changeShowModal} /> : null}
        </>

    )

}

const Modal = ({changeShowModal}) => {

    const [title, setTitle] = useState("");
    const [moreInfo, setMoreInfo] = useState("");
    const [employee, setEmployee] = useState("nobody");

    const [employeesList, setEmployeesList] = useState([]);
    const {getEmployees, loading, error, setDeal} = useData();

    useEffect(()=>{
        getEmployees()
        .then(onEmployeesLoaded)
    }, [])

    const changeValue = (e) => {
        switch(e.target.id){
            case "title": setTitle(e.target.value); break;
            case "more_info": setMoreInfo(e.target.value); break;
            default: setEmployee(e.target.value); break;
        }
    }

    const submitData = () => {
        setDeal({title, moreInfo, employee});
    }

    const onEmployeesLoaded = (res) => {
        setEmployeesList(res)
    }


    const renderOptions = () => {

        return [<option value="nobody">Никто</option>, employeesList.map((item, i)=><option key={i} value={item.login}>{item.name}</option>)]
    }

    const OptionList = employeesList.length ? renderOptions() : null;
    return (
        <div onClick={(e)=>{return e.target.classList.contains("popup")? changeShowModal() : null}} className="popup">
            <div className="popup_content">
                <div onClick={changeShowModal} className="close_btn">&#10010;</div>
                <div className="popup__title">Добавить задание</div>
                <hr />

                <form action="#" className="popup__content">

                    <div className="popup__content-wrapper">
                        <label htmlFor="title">Название задания</label>
                        <input value={title} onChange={changeValue} required className="add_task_form" type="text" id="title" />
                    </div>

                    <div className="popup__content-wrapper">
                        <label htmlFor="more_info">Подробная информация</label>
                        <textarea value={moreInfo} onChange={changeValue} className="add_task_form" type="text" id="more_info" />
                    </div>

                    <div className="popup__content-wrapper">
                        <label htmlFor="employees_list">Исполнитель</label>
                        <select value={employee} onChange={changeValue} className="add_task_form" name="employees_list" id="employees_list">
                            {OptionList}
                        </select>
                    </div>

                    <Button onClick={submitData} className="button_task" disabled = {loading}>Создать!</Button>

                </form>
            </div>

        </div>
    )
}

export default AddTask;