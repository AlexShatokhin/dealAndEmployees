import { useState } from "react"

import useModal from "../../../hooks/useModal";
import CountOfTasks from "../CountOfTasks/CountOfTasks";

import EmployeeModal from "../../EmployeeModal/EmployeeModal";
import EmployeesTasks from "../EmployeesTasks/EmployeesTasks";

import EmployeeItem from "../EmployeeItem/EmployeeItem";

import "./EmployeesList.scss"

const EmployeesList = ({dataTasks, dataEmp, changeEmployeeAdded, changeTaskAdded}) => {

    const [currEmployee, setCurrEmployee] = useState({});
    const [showTasks, setShowTasks] = useState(false);

    const {isShowModal, toggleModal, Modal} = useModal();


    function showDeals(employee){
        setCurrEmployee(employee);
        setShowTasks(true);
    }


    function renderEmployees(){
        return dataEmp.map((item, i)=>{
            return (
                <EmployeeItem showDeals = {showDeals} employee={item}/>
            )
        })
    }



    const isContent = dataEmp.length != 0 ? renderEmployees() : null;
    const modal = isShowModal ? <EmployeeModal Modal={Modal} toggleModal = {toggleModal} changeEmployeeAdded = {changeEmployeeAdded}/>  : null;
    const isShowTasks = showTasks ? <EmployeesTasks changeEmployeeAdded = {changeEmployeeAdded} changeTaskAdded = {changeTaskAdded} emmployeeData={currEmployee}/> : !showTasks ? <h3>Выберите сотрудника</h3> : null;

    return (
        <section className="employees">
            <div className="employees_wrapper">
                <div onClick={toggleModal} className="add_employee_button"> <span>+</span></div>
                    <div className="employees_list">
                        {isContent}
                        {modal}
                    </div>

            </div>

            <div className="tasks_wrapper">
                {isShowTasks}
            </div>
        </section>



    )
}

export default EmployeesList;