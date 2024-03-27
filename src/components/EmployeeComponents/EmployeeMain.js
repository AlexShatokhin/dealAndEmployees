import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { changeDealsList, changeUserData } from "./EmployeeSlice"

import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"
import useData from "../../services/getData"

import ChooseTask from "./ChooseTask/ChooseTask"
import CompleteTask from "./CompleteTask/CompleteTask"

const EmployeeMain = () => {

    const {empData} = useSelector(state => state.app)
    const {deals, user, taskAdded} = useSelector(state => state.employee);
    const {getDeals, getEmployee} = useData();
    const dispatch = useDispatch();

    useEffect(()=>{
        getDeals()
        .then((res) => dispatch(changeDealsList(res)))

        getEmployee(empData.id)
        .then(res => dispatch(changeUserData(res)))

    }, [taskAdded])

    
    function getFreeDeals(){
        const employeeDeals = user.response.map(deal => deal.taskID);
        return deals.filter(item => employeeDeals.indexOf(item.id) === -1);
    }

    const content = user.responseName ? 
        <div className="employee_wrapper">
            <div className="employee_main-my-tasks">
                <div className="employee-tasks_title">Мои задания</div>
                <hr />
                <TasksList 
                    data = {user.response} 
                    renderProps={(props)=><CompleteTask {...props} />}/>

            </div>

            <div className="employee_main-all-tasks">
                <div className="employee-tasks_title">Список заданий</div>
                <hr />
                <TasksList 
                    data = {getFreeDeals()} 
                    renderProps={(props)=><ChooseTask {...props} />}/>
            </div>
        </div>
        : null;
    return (
        <div className="employee_main">
            <NavigationMenu renderProps={()=><div></div>}/>
            {content}
        </div>
    )
}

export default EmployeeMain