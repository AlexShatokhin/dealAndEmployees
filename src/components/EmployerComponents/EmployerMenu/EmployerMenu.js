
import AddTask from "../AddTask/AddTask"
import AddEmployee from "../AddEmployee/AddEmployee"

const EmployerMenu = ({changeShowDeals, changeTaskAdded, changeEmployeeAdded}) => {
    return (
        <ul className="navigation_menu-items">
        <li onClick={()=>{changeShowDeals("deal")}} className="navigation_menu-item"> Задания  </li>
        <li onClick={()=>{changeShowDeals("employees")}} className="navigation_menu-item"> Работники  </li>
        <li className="navigation_menu-item"> <AddTask changeTaskAdded = {changeTaskAdded} /> </li>
        <li className="navigation_menu-item"> <AddEmployee changeEmployeeAdded = {changeEmployeeAdded} /> </li>
    </ul>
    )
}

export default EmployerMenu;