import useData from "../../../services/getData";

const EmployeesTasks = ({employee, emmployeeDeal, changeTaskAdded, changeEmployeeAdded}) => {

    const {editDeal} = useData()

    function changeDeal(deal){
        editDeal({title: deal.title, employeeID: "nobody", status: "new"}, deal.id)
        .then(()=>{
            changeTaskAdded(); 
            changeEmployeeAdded();
        })
    }

    function renderDeals(){

        return emmployeeDeal.length ? emmployeeDeal.map((item, i)=>{
            return (
                <div className="task">
                    <div className="task_title"> <span>{i+1}. </span>{item.title}</div>
                    <div className="task_buttons">
                        <div className="task_is_complete">{item.status == "complete" ?<i style = {{color: "#00FF15"}} className ="fa-solid fa-check"></i> : null}</div>
                        <div onClick={()=>{changeDeal(item)}} className="task_delete"> <i class="fa-solid fa-trash"></i></div>
                    </div>
                </div>
            )
        }) : <p>Заданий пока нет!</p>
    }

    return (
        <section className="employee_block">
            <div className="employee_name">{employee.name}</div>
            <hr />
            {renderDeals()}
        </section>
    )
}

export default EmployeesTasks; 