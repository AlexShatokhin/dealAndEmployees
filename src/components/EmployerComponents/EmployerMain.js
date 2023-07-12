import { useEffect, useState } from "react"

import EmployerMenu from "./EmployerMenu/EmployerMenu"
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"
import EmployeesList from "./EmployeesList/EmployeesList"
import AddTask from "./AddTask/AddTask"

import useData from "../../services/getData"


const EmployerMain = ({data, changeAuthType}) => {

    const [deals, setDeals] = useState([]);
    const [employees, setEmployees] = useState([]);
    
    const [taskAdded, setTaskAdded] = useState(false);
    const [employeeAdded, setEmployeeAdded] = useState(false);
    const [showComponents, setShowComponents] = useState("deal");

    const {getDeals, getEmployees, load} = useData();

    useEffect(()=>{
        
        getEmployees()
        .then(setEmployees)

    }, [employeeAdded])

    useEffect(()=>{
        getDeals()
        .then(setDeals)
    }, [taskAdded])

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
            
            <div className="back">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
            </div>

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
                data = {deals}
                changeTaskAdded={changeTaskAdded} 
                taskAdded = {taskAdded}/>
            </> :

            <EmployeesList
            dataTasks = {deals} 
            dataEmp = {employees}
            changeTaskAdded={changeTaskAdded} 
            changeEmployeeAdded = {changeEmployeeAdded}  
            employeeAdded = {employeeAdded} />}

        </section>
    )
}

export default EmployerMain