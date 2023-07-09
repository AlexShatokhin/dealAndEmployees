import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"

import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"
import useData from "../../services/getData"
import EmployeerTasksList from "./EmployeerTasksList/EmployeerTasksList"

import ChooseTask from "./ChooseTask/ChooseTask"
import CompleteTask from "./CompleteTask/CompleteTask"

const EmployeeMain = ({data, changeAuthType}) => {

    const [deals, setDeals] = useState([]);
    const {getDeals} = useData();
    const [taskAdded, setTaskAdded] = useState(false);

    useEffect(()=>{
        getDeals()
        .then(list => setDeals(list))
    }, [taskAdded])

    

    const changeTaskAdded = () => {
        setTaskAdded(!taskAdded);
    }

    return (
        <div className="employee_main">
            <NavigationMenu 
            data = {data} 
            changeAuthType={changeAuthType}
            renderProps={()=><div></div>}/>

            <div className="employee_wrapper">
                <div className="employee_main-my-tasks">
                    <div className="employee-tasks_title">Мои задания</div>
                    <hr />
                    <TasksList taskAdded={taskAdded} changeTaskAdded={changeTaskAdded} data = {deals.filter(item => item.employee == data.login)} employee = {data} renderProps={(props)=><CompleteTask {...props} />}/>

                </div>

                <div className="employee_main-all-tasks">
                    <div className="employee-tasks_title">Список заданий</div>
                    <hr />
                    <TasksList taskAdded={taskAdded} changeTaskAdded={changeTaskAdded} data = {deals.filter(item => item.employee == "nobody")} employee = {data} renderProps={(props)=><ChooseTask {...props} />}/>
                </div>
            </div>


        </div>
    )
}

export default EmployeeMain