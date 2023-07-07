import { useState } from "react"

import EmployerMenu from "./EmployerMenu/EmployerMenu"
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"
import EmployeesList from "./EmployeesList/EmployeesList"
import AddTask from "./AddTask/AddTask"

const EmployerMain = ({data, changeAuthType}) => {

    const [taskAdded, setTaskAdded] = useState(false);
    const [employeeAdded, setEmployeeAdded] = useState(false);
    const [showComponents, setShowComponents] = useState("deal");

    const changeTaskAdded = () => {
        setTaskAdded(!taskAdded);
    }

    const changeEmployeeAdded = () => {
        setEmployeeAdded(!employeeAdded);
    }


    const changeShowComponents = (type) => {
        setShowComponents(type)
    }

    return (
        <section className="employer_main">
            
            <NavigationMenu
            data = {data}
            changeAuthType = {changeAuthType}
            renderProps={()=>{
                return <EmployerMenu 
                changeShowComponents={changeShowComponents}/>
            }}/>

            {showComponents === "deal" ? 
            <>
                <AddTask changeTaskAdded={changeTaskAdded} />
                <TasksList 
                changeTaskAdded={changeTaskAdded} 
                taskAdded = {taskAdded}/>
            </> :

            <EmployeesList 
            changeEmployeeAdded = {changeEmployeeAdded}  
            employeeAdded = {employeeAdded} />}

        </section>
    )
}

export default EmployerMain