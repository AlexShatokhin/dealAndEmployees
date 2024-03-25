import { changeShowComponents } from "../EmployerSlice"
import { useDispatch } from "react-redux"

const EmployerMenu = () => {
    const dispatch = useDispatch();
    return (
        <ul className="navigation_menu-items">
            <li onClick={()=>{dispatch(changeShowComponents("deal")) }} className="navigation_menu-item">Задания</li>
            <li onClick={()=>{dispatch(changeShowComponents("employees"))}} className="navigation_menu-item">Работники</li>
        </ul>
    )
}

export default EmployerMenu;