import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { changeDeals, changeEmployees} from "./EmployerSlice"

import EmployerMenu from "./EmployerMenu/EmployerMenu"
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import EmployerTasksList from "./EmployerTasksList/EmployerTasksList"
import EmployeesList from "./EmployeesList/EmployeesList"
import AddTask from "./AddTask/AddTask"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"

import useData from "../../services/getData"

const EmployerMain = () => {

    const {taskAdded, employeeAdded, showComponents} = useSelector(state => state.employer);
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
            <NavigationMenu renderProps={()=> <EmployerMenu />}/>

        <ErrorBoundary>
            {showComponents === "deal" ? 
            <>
                <AddTask />
                <EmployerTasksList />
            </> : <EmployeesList />}
        </ErrorBoundary>

        </section>
    )
}

export default EmployerMain