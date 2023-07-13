import { useState } from "react";
import { Button } from "react-bootstrap";

const ChooseEmployee = ({dataEmp, toggleModal, index, changeCurrDeal, initEmp}) => {

    const [chosenEmp, setChosenEmp] = useState(initEmp ? initEmp : {});

    function changeChosenEmp(emp){
        setChosenEmp(emp); 
    }

    function renderEmployees(){
        return dataEmp.map(employee => {
            return (    
                <div style={chosenEmp.login == employee.login ? {backgroundColor: "rgba(17, 0, 255, 0.2)"} : null} className="employee_to_choose-item">
                    <div onClick={()=>changeChosenEmp(employee)}  className="employee-name">{employee.name}</div>
                </div>
            ) 
        })
    }

    return (
        <div className="employeers_to_choose">
            {renderEmployees()}
            <Button onClick={()=>{changeCurrDeal(index, chosenEmp); toggleModal(); }}>Выбрать!</Button>
        </div>
    )
}

export default ChooseEmployee;