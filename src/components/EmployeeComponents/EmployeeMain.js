
import NavigationMenu from "../NavigationMenu/NavigationMenu"

const EmployeeMain = ({data, changeAuthType}) => {

    return (
        <div className="employee_main">
            <NavigationMenu 
            data = {data} 
            changeAuthType={changeAuthType}
            renderProps={()=>5}/>
        </div>
    )
}

export default EmployeeMain