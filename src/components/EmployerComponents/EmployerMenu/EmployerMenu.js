
const EmployerMenu = ({changeShowComponents}) => {
    return (
        <ul className="navigation_menu-items">
            <li onClick={()=>{changeShowComponents("deal")}} className="navigation_menu-item">Задания</li>
            <li onClick={()=>{changeShowComponents("employees")}} className="navigation_menu-item">Работники</li>
        </ul>
    )
}

export default EmployerMenu;