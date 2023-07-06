import { useEffect, useState } from "react"
import { Spinner, Button } from "react-bootstrap";

import useData from "../../services/getData"
import TasksModal from "../EmployeeComponents/TasksModal/TasksModal";
import CountOfTasks from "../EmployeeComponents/CountOfTasks/CountOfTasks";

import "./EmployeesList.scss"

const EmployeesList = ({employeeAdded}) => {

    const [showModal, setShowModal] = useState(false);
    const [employeesList, setEmployeesList] = useState([]);
    const [dealsList, setDealsList] = useState([]);
    const {loading, error, getEmployees, getDeals, deleteEmployees, deleteDeal} = useData();


    useEffect(()=>{
        updateEmployees();
    }, [employeeAdded])

    function changeShowModal(){
        setShowModal(!showModal)
    }

    function updateEmployees(){
        getEmployees()
        .then(onEmployeesLoaded)
    }

    function onEmployeesLoaded(list){
        setEmployeesList(list);
    }

    function showDeals(login){
        getDeals()
        .then(res => {onDealsLoaded(res, login)})
    }

    function onDealsLoaded(list, login){
        setDealsList(list.filter(item => item.employee == login));
        changeShowModal();
    }

    function onDeleteEmployee(emp){
        getDeals()
        .then(list => setDealsList(list.filter(item => item.employee == emp.login)));

        deleteEmployees(emp.id)
        .then(updateEmployees)

        onDeleteDeal();

    }

    function onDeleteDeal(){
        dealsList.forEach((deal)=>{
            deleteDeal(deal.id);
        })
    }

    function renderEmployees(){

        return employeesList.map((item, i)=>{
            return (
                <div className="employees_list-item">
                    <div className="employees_list-item-name">{item.name}</div>
                    <CountOfTasks employee={item}/>
                    <Button onClick={()=>showDeals(item.login)} variant="primary">Задания</Button>
                    <Button onClick={()=>{onDeleteEmployee(item)}} variant="danger">Удалить</Button>
                </div>
            )
        })
    }

    function renderDeals(){

        return dealsList.length ? dealsList.map((item, i)=>{
            return (
                <TasksModal index={i} item = {item} />
            )
        }) : <p>Заданий пока нет!</p>
    }

    const isLoading = loading ? <Spinner style = {{display: "block", width: "100px", height: "100px", margin: "50px auto"}} animation="border" variant="danger"/> : null;
    const isContent = employeesList.length != 0 && !loading ? renderEmployees() : null;
    const modal = showModal ? (
                <div onClick={(e)=>{return e.target.classList.contains("popup")? changeShowModal() : null}} className="popup">
                    <div className="popup_content">
                        <div onClick={changeShowModal} className="close_btn">&#10010;</div>
                        {renderDeals()}
                    </div>
                </div>
    )  : null;


    return (
        <div className="employees_list">
            {isLoading}
            {isContent}
            {modal}
        </div>
    )
}

export default EmployeesList;