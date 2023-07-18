import { useEffect, useState } from "react";

import useData from "../../../services/getData"

const EmployeeItem = ({employee, showDeals}) => {

    const [employeeData, setEmployeeData] = useState({});
    const {getEmployee} = useData();

    useEffect(()=>{
        getEmployee(employee.id)
        .then(res => setEmployeeData({personalData: res.responseName[0], tasks: res.response, countAll: res.responseCountAll[0].countAll, countComplete: res.responseCountComplete[0].countComplete}))
    }, [])
    

    return (
        <div onClick={()=>showDeals(employeeData)} className="employees_list-item">
            <div className="employees_list-item-name">{employee.name}</div>
            <div style={{color:"#FFFFFF"}} className="count_of_tasks"><i style = {{color: "#00FF15"}} className ="fa-solid fa-check"></i> <span style = {{color: "#00FF15"}}>{employeeData.countComplete}</span>  / <span style = {{fontWeight: 600}}>{employeeData.countAll}</span> </div>

        </div>
    )
}

export default EmployeeItem;