import { useNavigate  } from "react-router-dom";
import { Button } from "react-bootstrap";

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
                <Button onClick={exitFromProfile} variant="primary" className="emp_exit">Выйти</Button>
            </div>

        </nav>
    )
}

export default NavigationMenu;