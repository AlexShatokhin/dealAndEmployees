import { useState } from "react"
import { Route, Routes } from "react-router"

import EmployerMenu from "./EmployerMenu/EmployerMenu"
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"
import Test from "../test/Test"

const EmployerMain = ({data, changeAuthType}) => {

    const [taskAdded, setTaskAdded] = useState(false);
    const [showDeals, setShowDeals] = useState("deal");

    const changeTaskAdded = () => {
        setTaskAdded(!taskAdded);
    }

    const changeShowDeals = (type) => {
        setShowDeals(type)
    }

    return (
        <section className="employer_main">
            
            <NavigationMenu
            changeShowDeals = {changeShowDeals} 
            changeTaskAdded = {changeTaskAdded} 
            changeAuthType = {changeAuthType} 
            data = {data}
            renderProps={()=>{
                return <EmployerMenu changeTaskAdded={changeTaskAdded} changeShowDeals={changeShowDeals}/>
            }}/>

            {showDeals === "deal" ? <TasksList taskAdded = {taskAdded}/> : <Test />}

        </section>
    )
}

export default EmployerMain