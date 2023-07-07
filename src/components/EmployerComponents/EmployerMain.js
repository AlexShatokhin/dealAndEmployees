import { useState } from "react"
import { Route, Routes } from "react-router"

import EmployerMenu from "./EmployerMenu/EmployerMenu"
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"
import Test from "../test/Test"
import EmployeesList from "../EmployeesList/EmployeesList"

const EmployerMain = ({data, changeAuthType}) => {

    const [taskAdded, setTaskAdded] = useState(false);
    const [employeeAdded, setEmployeeAdded] = useState(false);
    const [showDeals, setShowDeals] = useState("deal");

    const changeTaskAdded = () => {
        setTaskAdded(!taskAdded);
    }

    const changeEmployeeAdded = () => {
        setEmployeeAdded(!employeeAdded);
    }


    const changeShowDeals = (type) => {
        setShowDeals(type)
    }

    return (
        <section className="employer_main">
            
            <NavigationMenu
            data = {data}
            changeAuthType = {changeAuthType}
            renderProps={()=>{
                return <EmployerMenu 
                changeEmployeeAdded = {changeEmployeeAdded} 
                changeTaskAdded={changeTaskAdded} 
                changeShowDeals={changeShowDeals}/>
            }}/>

            {showDeals === "deal" ? 
            <TasksList 
            changeTaskAdded={changeTaskAdded} 
            taskAdded = {taskAdded}/> : 
            <EmployeesList employeeAdded = {employeeAdded} />}

        </section>
    )
}

export default EmployerMain