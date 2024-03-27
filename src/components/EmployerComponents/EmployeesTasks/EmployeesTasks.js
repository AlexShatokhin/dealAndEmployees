import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {toggleTaskAdded, toggleEmployeeAdded} from "../EmployerSlice";

import useData from "../../../services/getData";

import DealItem from "../DealItem/DealItem";

const EmployeesTasks = ({employeeData, showDeals}) => {

    const {taskAdded} = useSelector(state => state.employer)
    const dispatch = useDispatch();
    const {getEmployee, editEmployee} = useData();

    useEffect(()=>{
        getEmployee(employeeData.personalData.id)
        .then(res => {
            const empData = {
                personalData: res.responseName[0], 
                tasks: res.response, 
                countAll: res.responseCountAll[0].countAll, 
                countComplete: res.responseCountComplete[0].countComplete
            };
            showDeals(empData);
        })
    }, [taskAdded]);

    function refreshData(){
        dispatch(toggleEmployeeAdded());
        dispatch(toggleTaskAdded());
    }

    function changeEmp(){
        const status = employeeData.personalData.isWork === "true" ? "false" : "true";
        editEmployee({status}, employeeData.personalData.id)
        .then(() => refreshData())
    }
        
    function renderDeals(){

        return employeeData.tasks.length ? employeeData.tasks.map((item, i)=>{
            return (
                <DealItem 
                    refreshData = {refreshData}
                    deal = {item}
                    ind = {i+1}
                    employeeData = {employeeData}/>
            )
        }) : <p>Заданий пока нет!</p>
    }

    return (
        <section className="employee_block">
            <div style = {{position: "relative"}} className="title">
                <div className="employee_name">{employeeData.personalData.name}</div>
                <Button 
                    onClick={changeEmp} 
                    style={{position: "absolute", right: 15, bottom: 5, opacity: 0.9}} 
                    variant={employeeData.personalData.isWork === "true" ? "primary" : "warning"}>
                    {employeeData.personalData.isWork === "true" ? "Отключить" : "Включить"}
                </Button>
            </div>
            <hr />
            {renderDeals()}
        </section>
    )
}
 
export default EmployeesTasks; 