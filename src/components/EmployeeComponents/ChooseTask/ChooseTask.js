
import { Button } from "react-bootstrap"

import useData from "../../../services/getData"

const ChooseTask = ({changeTaskAdded, dealID, employee, deal}) => {

    const{editDeal} = useData()

    function changeTaskEmployee(){
        editDeal({...deal, employee: employee.login}, dealID);
        changeTaskAdded();
    }

    return (
        <Button onClick={changeTaskEmployee} variant="primary" >Выбрать!</Button>
    )
}

export default ChooseTask;