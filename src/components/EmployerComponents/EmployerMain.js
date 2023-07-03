
import NavigationMenu from "../NavigationMenu/NavigationMenu"
import AddTask from "./AddTask/AddTask"

const EmployerMain = ({data}) => {
    return (
        <section className="employer_main">
            <NavigationMenu data = {data}/>
            <AddTask />
            

        </section>
    )
}

export default EmployerMain