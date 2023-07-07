
const EmployeesTasks = ({employee, emmployeeDeal}) => {


    function renderDeals(){

        return emmployeeDeal.length ? emmployeeDeal.map((item, i)=>{
            return (
                <div className="task">
                    <div className="task_title">{item.title}</div>
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