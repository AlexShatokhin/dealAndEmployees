import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {toggleTaskAdded, toggleEmployeeAdded} from "../EmployerSlice";

import useData from "../../../services/getData";

import DealItem from "../DealItem/DealItem";

const EmployeesTasks = ({emmployeeData, showDeals}) => {

    const {taskAdded} = useSelector(state => state.employer)
    const dispatch = useDispatch();
    const {getEmployee, editEmployee} = useData();

    useEffect(()=>{
        getEmployee(emmployeeData.personalData.id)
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
        const status = emmployeeData.personalData.isWork === "true" ? "false" : "true";
        editEmployee({status}, emmployeeData.personalData.id)
        .then(() => refreshData())
    }
        
    function renderDeals(){

        return emmployeeData.tasks.length ? emmployeeData.tasks.map((item, i)=>{
            return (
                <DealItem 
                    refreshData = {refreshData}
                    deal = {item}
                    ind = {i+1}
                    employeeData = {emmployeeData}/>
            )
        }) : <p>Заданий пока нет!</p>
    }

    return (
        <section className="employee_block">
            <div style = {{position: "relative"}} className="title">
                <div className="employee_name">{emmployeeData.personalData.name}</div>
                <Button onClick={changeEmp} style={{position: "absolute", right: 15, bottom: 5, opacity: 0.9}} variant={emmployeeData.personalData.isWork === "true" ? "primary" : "warning"}>{emmployeeData.personalData.isWork === "true" ? "Отключить" : "Включить"}</Button>
            </div>
            <hr />
            {renderDeals()}
        </section>
    )
}
 
export default EmployeesTasks; 