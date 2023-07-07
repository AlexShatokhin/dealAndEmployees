
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import TasksList from "../TasksList/TasksList"

const EmployeeMain = ({data, changeAuthType}) => {

    return (
        <div className="employee_main">
            <NavigationMenu 
            data = {data} 
            changeAuthType={changeAuthType}
            renderProps={()=>"Hello!"}/>

            <TasksList 
            renderProps = {()=>{
                return (
                    <h1>Hello!</h1>
                )
            }}/>

        </div>
    )
}

export default EmployeeMain