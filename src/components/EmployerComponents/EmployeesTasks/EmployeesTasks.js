import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import useData from "../../../services/getData";

const EmployeesTasks = ({emmployeeData, changeTaskAdded, changeEmployeeAdded, taskAdded, showDeals}) => {

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

    function changeEmp(){
        editEmployee({status: emmployeeData.personalData.isWork === "true" ? "false" : "true"}, emmployeeData.personalData.id)
        .then(() => {changeTaskAdded(); changeEmployeeAdded()})
    }
        
    function renderDeals(){

        return emmployeeData.tasks.length ? emmployeeData.tasks.map((item, i)=>{
            return (
                <DealItem 
                changeTaskAdded = {changeTaskAdded} 
                changeEmployeeAdded = {changeEmployeeAdded}
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

const DealItem = ({deal, ind, changeTaskAdded, changeEmployeeAdded, employeeData}) => {
    
    const [isShowInfo, setIsShowInfo] = useState(false);
    const {editDeal} = useData();

    useEffect(()=>setIsShowInfo(false), [deal])

    function changeDeal(deal){
        editDeal({employeeID: employeeData.personalData.id, status: deal.status, action: "DEL_EMP"}, deal.taskID)
        .then(()=>{
            changeTaskAdded(); 
            changeEmployeeAdded();
        })
    }

    function changeInfoMode(){
        setIsShowInfo(!isShowInfo)
    }
    return (
        <div className="task">
            <div className="task_title"> <span>{ind}. </span>{deal.title}</div>
            <div className="task_buttons">
                <div className="task_is_complete">{deal.status == "complete" ?<i style = {{color: "#00FF15"}} className ="fa-solid fa-check"></i> : null}</div>
                <div onClick={()=>{changeDeal(deal)}} className="task_delete"> <i className="fa-solid fa-trash"></i></div>
                <div className="task_info" onClick={changeInfoMode}><i style={{transform: isShowInfo ? "rotate(180deg)" : "rotate(0deg)", transition: ".2s all"}}  className="fa-solid fa-chevron-down"></i></div>
            </div>
            {isShowInfo ? 
                <>
                    <hr />
                    <div className="information_wrapper">
                        {deal.information}
                    </div>
                </> : null}
        </div>
    )  
}

 
export default EmployeesTasks; 