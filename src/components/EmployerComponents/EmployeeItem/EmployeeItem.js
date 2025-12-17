import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import useData from "../../../services/getData"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./skeleton.scss"

const EmployeeItem = ({employee, showDeals}) => {

    const [employeeData, setEmployeeData] = useState({});
    const {employeeAdded} = useSelector(state => state.employer);
    const {getEmployee, loading} = useData();

    useEffect(()=>{
        getEmployeeData();
        const refreshInterval = setInterval(getEmployeeData, 60000);

        return () => {
            clearInterval(refreshInterval)
        }
    }, [employeeAdded])


    function getEmployeeData(){
        getEmployee(employee.id)
        .then(res => {
            const empData = {
                personalData: res.responseName[0], 
                tasks: res.response, 
                countAll: res.responseCountAll[0].countAll, 
                countComplete: res.responseCountComplete[0].countComplete
            };
            setEmployeeData(empData);
        })
        .catch(err => console.log(err));
    }

    return (
        <div style={{opacity: employee.isWork === "false" ? "0.5" : "1", transition: ".2s all"}} onClick={()=>showDeals(employeeData)} className="employees_list-item">
            <div className="employees_list-item-name">{employee.name}</div>
            <div style={{color:"#FFFFFF", display: "flex", justifyContent: "space-between", columnGap: 20, alignItems: "center"}} className="count_of_tasks">
                <i style = {{color: "#00FF15"}} className ="fa-solid fa-check"></i> 
                <div style={{display: "flex", columnGap: 5}}>
                    <span style = {{color: "#00FF15", marginLeft: 10}}>{loading ? <Skeleton width={15} style={{color: "#000000"}}/> : employeeData.countComplete}</span> 
                    <span>/</span> 
                    <span style = {{fontWeight: 600}}>{loading ? <Skeleton width={15} style={{color: "#000000"}}/> : employeeData.countAll}</span> 
                </div>
            </div>
        </div>
    )
}

export default EmployeeItem;