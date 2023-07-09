
import { Button } from "react-bootstrap"

import useData from "../../../services/getData"

const CompleteTask = ({changeTaskAdded, dealID, employee, deal}) => {

    const{editDeal} = useData()

    function changeTaskEmployee(){
        editDeal({...deal, status: "complete"}, dealID);
        changeTaskAdded();
    }

    return (
        <Button onClick={changeTaskEmployee} variant={deal.status == "new" ? "primary" : "success"} disabled = {deal.status == "complete"} >{deal.status == "new" ? "Выполнить!" : "Выполнено!"}</Button>
    )
}

export default CompleteTask;