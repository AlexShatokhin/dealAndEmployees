import { useState } from "react";
import useData from "../../../services/getData";

const EmployeesTasks = ({employee, emmployeeDeal, changeTaskAdded, changeEmployeeAdded}) => {

    function renderDeals(){

        return emmployeeDeal.length ? emmployeeDeal.map((item, i)=>{
            return (
                <DealItem 
                changeTaskAdded = {changeTaskAdded} 
                changeEmployeeAdded = {changeEmployeeAdded}
                deal = {item}
                ind = {i+1}/>
            )
        }) : <p>Заданий пока нет!</p>
    }

    return (
        <section className="employee_block">
            <div className="employee_name">{employee.name}</div>
            <hr />
            {renderDeals()}
        </section>
    )
}


const DealItem = ({deal, ind, changeTaskAdded, changeEmployeeAdded}) => {
    
    const [isShowInfo, setIsShowInfo] = useState(false);
    const {editDeal} = useData();

    function changeDeal(deal){
        editDeal({title: deal.title, employeeID: "nobody", status: "new"}, deal.id)
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