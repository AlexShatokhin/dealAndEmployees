import { changeShowComponents } from "../EmployerSlice"
import { useDispatch } from "react-redux"

const EmployerMenu = () => {
    const dispatch = useDispatch();

    function toggleMenu(mode) {
        dispatch(changeShowComponents(mode));
    }

    return (
        <ul className="navigation_menu-items">
            <li onClick={()=>{toggleMenu("deal") }} className="navigation_menu-item">Задания</li>
            <li onClick={()=>{toggleMenu("employees")}} className="navigation_menu-item">Работники</li>
        </ul>
    )
}

export default EmployerMenu;