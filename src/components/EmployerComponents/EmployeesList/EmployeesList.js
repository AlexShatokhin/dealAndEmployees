import { useState } from "react"
import { useSelector } from "react-redux";

import useModal from "../../../hooks/useModal";

import EmployeeModal from "../../EmployeeModal/EmployeeModal";
import EmployeesTasks from "../EmployeesTasks/EmployeesTasks";

import EmployeeItem from "../EmployeeItem/EmployeeItem";

import "./EmployeesList.scss"

const EmployeesList = () => {

    const [currEmployee, setCurrEmployee] = useState({});
    const [showTasks, setShowTasks] = useState(false);

    const {employees} = useSelector(state => state.employer);
    const {isShowModal, toggleModal, Modal} = useModal();


    function showDeals(employee){
        setCurrEmployee(employee);
        setShowTasks(true);
    }


    function renderEmployees(){
        return employees.map((item)=>{
            return (
                <EmployeeItem 
                    showDeals = {showDeals} 
                    employee={item}/>
            )
        })
    }

    const isContent = employees.length !== 0 ? renderEmployees() : null;
    const modal = isShowModal ? <EmployeeModal Modal={Modal} toggleModal = {toggleModal}/>  : null;
    const isShowTasks = showTasks ? <EmployeesTasks showDeals = {showDeals} employeeData={currEmployee}/> : !showTasks ? <h3>Выберите сотрудника</h3> : null;

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