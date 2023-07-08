import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"

import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"
import useData from "../../services/getData"
import EmployeerTasksList from "./EmployeerTasksList/EmployeerTasksList"

const EmployeeMain = ({data, changeAuthType}) => {

    const [deals, setDeals] = useState([]);
    const {getDeals} = useData();
    const [taskAdded, setTaskAdded] = useState(false);

    useEffect(()=>{
        getDeals()
        .then(list => setDeals(list))
    }, [])

    

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
                    <EmployeerTasksList taskAdded={taskAdded} changeTaskAdded={changeTaskAdded} data = {deals.filter(item => item.employee == data.login)} employee = {data}/>

                </div>

                <div className="employee_main-all-tasks">
                    <div className="employee-tasks_title">Список заданий</div>
                    <EmployeerTasksList taskAdded={taskAdded} changeTaskAdded={changeTaskAdded} data = {deals.filter(item => item.employee == "nobody")} employee = {data}/>
                </div>
            </div>


        </div>
    )
}

export default EmployeeMain