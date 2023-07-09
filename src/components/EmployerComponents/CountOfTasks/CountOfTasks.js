import { useEffect, useState } from "react";

const CountOfTasks = ({data, employee}) => {

    const [employeeDeals, setEmployeeDeals] = useState([]);

    useEffect(()=>{
        setEmployeeDeals(data.filter(item => item.employee == employee.login));
    }, [data])

    function getCompleteTasks(){
        return employeeDeals.filter((item)=>item.status == "complete");
    }

    return (
        <div style={{color:"#FFFFFF"}} className="count_of_tasks"><i style = {{color: "#00FF15"}} className ="fa-solid fa-check"></i> <span style = {{color: "#00FF15"}}>{getCompleteTasks().length}</span>  / <span style = {{fontWeight: 600}}>{employeeDeals.length}</span> </div>
    )
}

export default CountOfTasks;