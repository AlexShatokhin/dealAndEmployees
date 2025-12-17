import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { changeDeals, changeEmployees} from "./EmployerSlice"

import EmployerMenu from "./EmployerMenu/EmployerMenu"
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import EmployerTasksList from "./EmployerTasksList/EmployerTasksList"
import EmployeesList from "./EmployeesList/EmployeesList"
import AddTask from "./AddTask/AddTask"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import useEmployeeApi from "../../hooks/employee-api.hook"
import useDealApi from "../../hooks/deal-api.hook"

const EmployerMain = () => {

    const {taskAdded, employeeAdded, showComponents} = useSelector(state => state.employer);
    const dispatch = useDispatch();
    const {getEmployees, loading} = useEmployeeApi();
    const {getDeals} = useDealApi()

    useEffect(()=>{
        getEmployees()
        .then((res) => dispatch(changeEmployees(res)))
        .catch(err => console.log(err))
    }, [employeeAdded])

    useEffect(()=>{
        getDeals()
        .then((res) => dispatch(changeDeals(res)))
        .catch(err => console.log(err))
    }, [taskAdded])

    return (
        <section className="employer_main">
            <NavigationMenu renderProps={()=> <EmployerMenu />}/>

        <ErrorBoundary>
            {showComponents === "deal" ? 
            <>
                <AddTask />
                <EmployerTasksList loading={loading}/>
            </> : <EmployeesList />}
        </ErrorBoundary>

        </section>
    )
}

export default EmployerMain