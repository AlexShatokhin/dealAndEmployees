import { useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { changeAuthType } from "../App/appSlice";

import "./NavigationMenu.scss"
const NavigationMenu = ({renderProps}) => {

    const {empData} = useSelector(state => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const exitFromProfile = () => {
        navigate("/");
        dispatch(changeAuthType({type: "none", data: {}}));
    }

    return (
        <nav className="navigation_menu">
           {renderProps()}
            <div className="emp_info">
                <div className="emp_name">{empData.name}</div>
                <div onClick={exitFromProfile} variant="primary" className="emp_exit"><i className ="fa-solid fa-right-from-bracket"></i></div>
            </div>

        </nav>
    )
}

export default NavigationMenu;