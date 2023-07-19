import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import useData from "../../../services/getData";
import "./ChooseEmployee.scss"

const ChooseEmployee = ({dataEmp, changeChosenEmp, getChosenEmps}) => {

    function isChosenEmp(emp){
        return getChosenEmps().filter(item => item.id == emp.id).length;
    }

    function renderEmployees(){
        return dataEmp.map(employee => {
            return (    
                <div  onClick={()=>changeChosenEmp(employee)}  style={ isChosenEmp(employee) ? {backgroundColor: "#938fff", transition: ".3s all"} : null} className="employee_to_choose-item">
                    <div className="employee-name">{employee.name}</div>
                </div>
            ) 
        })
    }

    return (
        <>
            <hr style={{width: "100%"}}/>
            <div className="employeers_to_choose">
                {renderEmployees()}
            </div>
        </>

    )
}

export default ChooseEmployee;