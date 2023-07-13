import { useState, useEffect } from "react"

import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import useData from "../../services/getData"

import ChooseTask from "./ChooseTask/ChooseTask"
import CompleteTask from "./CompleteTask/CompleteTask"

const EmployeeMain = ({data, changeAuthType}) => {

    const [deals, setDeals] = useState([]);
    const [user, setUser] = useState({});
    const {getDeals, getEmployees} = useData();
    const [taskAdded, setTaskAdded] = useState(false);

    useEffect(()=>{
        getDeals()
        .then(setDeals)

        getEmployees()
        .then(res => setUser(res.filter(emp => emp.login === data.login)[0]))
    }, [taskAdded])

    

    const changeTaskAdded = () => {
        setTaskAdded(!taskAdded);
    }

    return (
        <div className="employee_main">
            <div className="back">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
            </div>

            <NavigationMenu 
            data = {data} 
            changeAuthType={changeAuthType}
            renderProps={()=><div></div>}/>


            <ErrorBoundary>
            <div className="employee_wrapper">
                <div className="employee_main-my-tasks">
                    <div className="employee-tasks_title">Мои задания</div>
                    <hr />
                    <TasksList taskAdded={taskAdded} changeTaskAdded={changeTaskAdded} data = {deals.filter(item => item.employee == data.login)} employee = {user} renderProps={(props)=><CompleteTask {...props} />}/>

                </div>

                <div className="employee_main-all-tasks">
                    <div className="employee-tasks_title">Список заданий</div>
                    <hr />
                    <TasksList taskAdded={taskAdded} changeTaskAdded={changeTaskAdded} data = {deals.filter(item => item.employee == null)} employee = {user} renderProps={(props)=><ChooseTask {...props} />}/>
                </div>
            </div>
        </ErrorBoundary>


        </div>
    )
}

export default EmployeeMain