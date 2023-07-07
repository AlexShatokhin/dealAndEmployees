import { useNavigate  } from "react-router-dom";

import "./NavigationMenu.scss"

const NavigationMenu = ({data, changeAuthType, renderProps}) => {

    const navigate = useNavigate();

    const exitFromProfile = () => {
        navigate("/");
        changeAuthType("none", {});
    }

    return (
        <nav className="navigation_menu">
           {renderProps()}
            <div className="emp_info">
                <div className="emp_name">{data.name}</div>
                <div onClick={exitFromProfile} variant="primary" className="emp_exit"><i className ="fa-solid fa-right-from-bracket"></i></div>
            </div>

        </nav>
    )
}

export default NavigationMenu;