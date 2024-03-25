import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import useData from "../../../services/getData"

const EmployeeItem = ({employee, showDeals}) => {

    const [employeeData, setEmployeeData] = useState({});
    const {employeeAdded} = useSelector(state => state.employer);
    const {getEmployee, loading} = useData();

    useEffect(()=>{
        getEmployee(employee.id)
        .then(res => {
            const empData = {
                personalData: res.responseName[0], 
                tasks: res.response, 
                countAll: res.responseCountAll[0].countAll, 
                countComplete: res.responseCountComplete[0].countComplete
            };
            setEmployeeData(empData);
        });
    }, [employeeAdded])


    return (
        <div style={{opacity: employee.isWork === "false" ? "0.5" : "1", transition: ".2s all"}} onClick={()=>showDeals(employeeData)} className="employees_list-item">
            <div className="employees_list-item-name">{employee.name}</div>
            <div style={{color:"#FFFFFF"}} className="count_of_tasks"><i style = {{color: "#00FF15"}} className ="fa-solid fa-check"></i> <span style = {{color: "#00FF15"}}>{employeeData.countComplete}</span>  / <span style = {{fontWeight: 600}}>{employeeData.countAll}</span> </div>
        </div>
    )
}

export default EmployeeItem;