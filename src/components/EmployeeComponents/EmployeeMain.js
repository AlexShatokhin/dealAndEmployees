
import { Button } from "react-bootstrap"

import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"

const EmployeeMain = ({data, changeAuthType}) => {

    return (
        <div className="employee_main">
            <NavigationMenu 
            data = {data} 
            changeAuthType={changeAuthType}
            renderProps={()=><div></div>}/>

            <div className="employee_wrapper">
                <div className="employee_main-my-tasks">
                    <div className="employee-tasks_title">{data.name}</div>
                </div>

                <div className="employee_main-all-tasks">
                    <div className="employee-tasks_title">Список заданий</div>
                    <TasksList 
                    renderProps = {()=>{
                        return (
                            <Button>Выбрать!</Button>
                        )
                    }}/>
                </div>
            </div>






        </div>
    )
}

export default EmployeeMain