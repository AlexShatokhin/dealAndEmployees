import { Button } from "react-bootstrap"

import useData from "../../../services/getData"

const CompleteTask = ({changeTaskAdded, dealID, employee, deal}) => {

    const{editDeal} = useData()

    function changeTaskEmployee(){
        editDeal({status: "complete", title: deal.title, employeeID: employee.id}, dealID)
        .then(changeTaskAdded)
        
    }

    return (
        <Button onClick={changeTaskEmployee} variant={deal.status == "work" ? "primary" : "success"} disabled = {deal.status == "complete"} >{deal.status == "work" ? "Выполнить!" : "Выполнено!"}</Button>
    )
}

export default CompleteTask;