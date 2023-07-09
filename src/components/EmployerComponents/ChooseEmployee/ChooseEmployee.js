import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import useEmployees from "../../../hooks/EditEmployees";

const ChooseEmployee = ({toggleModal, index, changeCurrDeal, initEmp}) => {

    const [chosenEmp, setChosenEmp] = useState(initEmp);
    const {employeesList, updateEmployees, loading}  = useEmployees();

    useEffect(updateEmployees, []);

    function changeChosenEmp(emp){
        setChosenEmp(emp.login); 
    }

    function renderEmployees(){
        return employeesList.map(employee => {
            return (    
                <div style={chosenEmp == employee.login ? {backgroundColor: "rgba(17, 0, 255, 0.2)"} : null} className="employee_to_choose-item">
                    <div onClick={()=>changeChosenEmp(employee)}  className="employee-name">{employee.name}</div>
                </div>
            ) 
        })
    }

    return (
        <div className="employeers_to_choose">
            {loading ? <Spinner style = {{display: "block", width: "100px", height: "100px", margin: "50px auto"}} animation="border" variant="primary"/> : renderEmployees()}
            <Button onClick={()=>{changeCurrDeal(index, chosenEmp); toggleModal(); }}>Выбрать!</Button>
        </div>
    )
}

export default ChooseEmployee;