import { useEffect, useState } from "react"
import { Spinner, Button } from "react-bootstrap";

import useData from "../../services/getData"
import useModal from "../../hooks/useModal";
import useEmployees from "../../hooks/EditEmployees";
import TasksModal from "../EmployeeComponents/TasksModal/TasksModal";
import CountOfTasks from "../EmployeeComponents/CountOfTasks/CountOfTasks";

import "./EmployeesList.scss"

const EmployeesList = ({employeeAdded}) => {

    const [dealsList, setDealsList] = useState([]);

    const {loading, error, getEmployees, getDeals, deleteEmployees, deleteDeal} = useData();
    const {isShowModal, toggleModal, Modal} = useModal();
    const {employeesList, updateEmployees} = useEmployees();


    useEffect(()=>{
        updateEmployees();
    }, [employeeAdded])


    function showDeals(login){
        getDeals()
        .then(res => {onDealsLoaded(res, login)})
    }

    function onDealsLoaded(list, login){
        setDealsList(list.filter(item => item.employee == login));
        toggleModal();
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
    const modal = isShowModal ? 
        <Modal>
            {renderDeals()}
        </Modal>  : null;


    return (
        <div className="employees_list">
            {isLoading}
            {isContent}
            {modal}
        </div>
    )
}

export default EmployeesList;