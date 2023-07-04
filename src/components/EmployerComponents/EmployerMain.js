import { useState } from "react"

import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"


const EmployerMain = ({data, changeAuthType}) => {

    const [taskAdded, setTaskAdded] = useState(false);

    const changeTaskAdded = () => {
        setTaskAdded(!taskAdded);
    }

    return (
        <section className="employer_main">
            <NavigationMenu changeTaskAdded = {changeTaskAdded} changeAuthType = {changeAuthType} data = {data}/>
            <TasksList flag = {taskAdded}/>

        </section>
    )
}

export default EmployerMain