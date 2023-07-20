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
    const {getDeals, getEmployees, getEmployee} = useData();
    const [taskAdded, setTaskAdded] = useState(false);

    useEffect(()=>{
        getDeals()
        .then(setDeals)

        getEmployees()
        .then(res => res.filter(item => item.login == data.login)[0].id)
        .then(getEmployee)
        .then(res => {setUser(res); console.log(res)})
    }, [taskAdded])

    
    function getFreeDeals(){
        const employeeDeals = user.response.map(deal => deal.taskID);

        return deals.filter(item => employeeDeals.indexOf(item.id) == -1);
    }

    const changeTaskAdded = () => {
        setTaskAdded(!taskAdded);
    }

    const content = user.responseName ? 
        <div className="employee_wrapper">
            <div className="employee_main-my-tasks">
                <div className="employee-tasks_title">Мои задания</div>
                <hr />
                <TasksList taskAdded={taskAdded} changeTaskAdded={changeTaskAdded} data = {user.response} employee = {user.responseName} renderProps={(props)=><CompleteTask {...props} />}/>

            </div>

            <div className="employee_main-all-tasks">
                <div className="employee-tasks_title">Список заданий</div>
                <hr />
                <TasksList taskAdded={taskAdded} changeTaskAdded={changeTaskAdded} data = {getFreeDeals()} employee = {user.responseName} renderProps={(props)=><ChooseTask {...props} />}/>
            </div>
        </div>
        : console.log(user);
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

            {content}


        </div>
    )
}

export default EmployeeMain