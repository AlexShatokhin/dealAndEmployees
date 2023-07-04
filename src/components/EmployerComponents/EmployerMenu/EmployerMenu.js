
import AddTask from "../AddTask/AddTask"

const EmployerMenu = ({changeShowDeals, changeTaskAdded}) => {
    return (
        <ul className="navigation_menu-items">
        <li onClick={()=>{changeShowDeals("deal")}} className="navigation_menu-item"> Задания  </li>
        <li onClick={()=>{changeShowDeals("employees")}} className="navigation_menu-item"> Работники  </li>
        <li className="navigation_menu-item"> <AddTask changeTaskAdded = {changeTaskAdded} /> </li>
    </ul>
    )
}

export default EmployerMenu;