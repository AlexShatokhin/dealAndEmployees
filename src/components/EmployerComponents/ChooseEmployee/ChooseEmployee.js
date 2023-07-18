import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import useData from "../../../services/getData";

const ChooseEmployee = ({dataEmp, toggleModal, index, changeCurrDeal, initEmp, dataDeals}) => {

    const [chosenEmp, setChosenEmp] = useState([]);
    const {getDeal} = useData();

    useEffect(()=>{
        getDeal(dataDeals[index].id)
        .then(res => setChosenEmp(res.map(item => ({id:item.id, login: item.login}))));
    }, [])

    function changeChosenEmp(emp){
        if(chosenEmp.indexOf(emp) == -1){
            setChosenEmp([...chosenEmp, emp]); 
        } else {
            setChosenEmp(chosenEmp.filter(item => item.id != emp.id));
        }
        
    }

    function renderEmployees(){
        return dataEmp.map(employee => {
            return (    
                <div style={chosenEmp.filter(item => item.id == employee.id).length ? {backgroundColor: "rgba(17, 0, 255, 0.2)"} : null} className="employee_to_choose-item">
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