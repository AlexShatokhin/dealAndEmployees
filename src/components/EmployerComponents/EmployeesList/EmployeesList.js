import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap";

import useData from "../../../services/getData"
import useModal from "../../../hooks/useModal";
import useEmployees from "../../../hooks/EditEmployees";
import CountOfTasks from "../CountOfTasks/CountOfTasks";

import EmployeeModal from "../../EmployeeModal/EmployeeModal";
import EmployeesTasks from "../EmployeesTasks/EmployeesTasks";

import "./EmployeesList.scss"

const EmployeesList = ({employeeAdded, changeEmployeeAdded}) => {

    const [dealsList, setDealsList] = useState([]);
    const [currEmployee, setCurrEmployee] = useState({});
    const [showTasks, setShowTasks] = useState(false);

    const {loading, error, getDeals} = useData();
    const {isShowModal, toggleModal, Modal} = useModal();
    const {employeesList, updateEmployees} = useEmployees();


    useEffect(()=>{
        updateEmployees();
    }, [employeeAdded])


    function showDeals(employee){
        getDeals()
        .then(res => {onDealsLoaded(res, employee.login)})
        setCurrEmployee(employee);
    }

    function onDealsLoaded(list, login){
        setDealsList(list.filter(item => item.employee == login));
        setShowTasks(true);
    }



    function renderEmployees(){
        return employeesList.map((item, i)=>{
            return (
                <div onClick={()=>showDeals(item)} className="employees_list-item">
                    <div className="employees_list-item-name">{item.name}</div>
                    <CountOfTasks employee={item}/>
                </div>
            )
        })
    }



    const isLoading = loading ? <Spinner style = {{display: "block", width: "100px", height: "100px", margin: "50px auto"}} animation="border" variant="danger"/> : null;
    const isContent = employeesList.length != 0 ? renderEmployees() : null;
    const modal = isShowModal ? <EmployeeModal Modal={Modal} toggleModal = {toggleModal} changeEmployeeAdded = {changeEmployeeAdded}/>  : null;
    const isShowTasks = showTasks && !loading ? <EmployeesTasks emmployeeDeal={dealsList} employee={currEmployee}/> : !showTasks && !loading ? <h3>Выберите сотрудника</h3> : null;

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
                {isLoading}
                {isShowTasks}
            </div>
        </section>



    )
}

export default EmployeesList;