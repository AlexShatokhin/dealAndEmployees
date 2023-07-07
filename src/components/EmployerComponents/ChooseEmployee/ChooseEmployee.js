import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import useEmployees from "../../../hooks/EditEmployees";

const ChooseEmployee = ({toggleModal, index, changeCurrDeal, initEmp}) => {

    const [chosenEmp, setChosenEmp] = useState(initEmp);
    const {employeesList, updateEmployees}  = useEmployees();

    useEffect(updateEmployees, []);

    function changeChosenEmp(emp){
        setChosenEmp(emp.login); 
    }

    function renderEmployees(){
        return employeesList.map(employee => {
            return (    
                <div className="employee_to_choose-item">
                    <div onClick={()=>changeChosenEmp(employee)} style={chosenEmp == employee.login ? {color: "green"} : null} className="employee-name">{employee.name}</div>
                </div>
            ) 
        })
    }

    return (
        <div className="employeers_to_choose">
            {renderEmployees()}
            <Button onClick={()=>{changeCurrDeal(index, chosenEmp); toggleModal() }}>Выбрать!</Button>
        </div>
    )
}

export default ChooseEmployee;