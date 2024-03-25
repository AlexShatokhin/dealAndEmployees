import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { changeDeals, 
    changeEmployees, 
    changeShowComponents, 
    toggleTaskAdded, 
    toggleEmployeeAdded} from "./EmployerSlice"

import EmployerMenu from "./EmployerMenu/EmployerMenu"
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import EmployerTasksList from "./EmployerTasksList/EmployerTasksList"
import EmployeesList from "./EmployeesList/EmployeesList"
import AddTask from "./AddTask/AddTask"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"

import useData from "../../services/getData"

const EmployerMain = () => {

    const {deals, employees, taskAdded, employeeAdded, showComponents} = useSelector(state => state.employer);
    const dispatch = useDispatch();
    const {getDeals, getEmployees} = useData();

    useEffect(()=>{
        getEmployees()
        .then((res) => dispatch(changeEmployees(res)))
    }, [employeeAdded])

    useEffect(()=>{
        getDeals()
        .then((res) => dispatch(changeDeals(res)))
    }, [taskAdded])

    return (
        <section className="employer_main">
            
            <div className="back">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
            </div>

            <NavigationMenu
            renderProps={()=>{
                return <EmployerMenu 
                changeShowComponents={(type) => dispatch(changeShowComponents(type))}/>
            }}/>

        <ErrorBoundary>
            {showComponents === "deal" ? 
            <>
                <AddTask changeTaskAdded={() => dispatch(toggleTaskAdded())} />
                <EmployerTasksList 
                dataEmp = {employees}
                data = {deals}
                changeTaskAdded={() => dispatch(toggleTaskAdded())}          
                taskAdded = {taskAdded}/>
            </> :

            <EmployeesList />}
        </ErrorBoundary>


        </section>
    )
}

export default EmployerMain