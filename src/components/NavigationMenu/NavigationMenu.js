import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import AddTask from "../EmployerComponents/AddTask/AddTask.js"

import "./NavigationMenu.scss"

const NavigationMenu = ({data, changeAuthType, changeTaskAdded}) => {

    const [isExit, setIsExit] = useState(false);

    const exitFromProfile = () => {
        setIsExit(true);
        changeAuthType("none", {});
    }

    return (
        <nav className="navigation_menu">
            <ul className="navigation_menu-items">
                <li className="navigation_menu-item"> <Link to={"/employer/tasks"}> Задания </Link> </li>
                <li className="navigation_menu-item"> <Link to={"/employer/employees"}> Работники </Link> </li>
                <li className="navigation_menu-item"> <AddTask changeTaskAdded = {changeTaskAdded} /> </li>
            </ul>
            <div className="emp_info">
                <div className="emp_name">{data.name}</div>
                <Button onClick={exitFromProfile} variant="primary" className="emp_exit">Выйти</Button>
            </div>

            {isExit ? <Navigate to="/"/> : null}
        </nav>
    )
}

export default NavigationMenu;