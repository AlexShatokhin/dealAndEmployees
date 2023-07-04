import { useNavigate  } from "react-router-dom";
import { Button } from "react-bootstrap";

import AddTask from "../EmployerComponents/AddTask/AddTask.js"

import "./NavigationMenu.scss"

const NavigationMenu = ({data, changeAuthType, changeTaskAdded, changeShowDeals}) => {

    const navigate = useNavigate();

    const exitFromProfile = () => {
        navigate("/");
        changeAuthType("none", {});
    }

    return (
        <nav className="navigation_menu">
            <ul className="navigation_menu-items">
                <li onClick={()=>{changeShowDeals("deal")}} className="navigation_menu-item"> Задания  </li>
                <li onClick={()=>{changeShowDeals("employees")}} className="navigation_menu-item"> Работники  </li>
                <li className="navigation_menu-item"> <AddTask changeTaskAdded = {changeTaskAdded} /> </li>
            </ul>
            <div className="emp_info">
                <div className="emp_name">{data.name}</div>
                <Button onClick={exitFromProfile} variant="primary" className="emp_exit">Выйти</Button>
            </div>

        </nav>
    )
}

export default NavigationMenu;