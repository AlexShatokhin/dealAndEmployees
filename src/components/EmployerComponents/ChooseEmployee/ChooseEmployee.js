import { useSelector } from "react-redux";
import "./ChooseEmployee.scss"

const ChooseEmployee = ({changeChosenEmp, chosenEmps}) => {

    const {employees} = useSelector(state => state.employer);

    function isChosenEmp(emp){
        return chosenEmps.filter(item => +item.id === +emp.id).length;
    }

    function renderEmployees(){
        return employees.map(employee => {
            if(employee.isWork === "true")
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