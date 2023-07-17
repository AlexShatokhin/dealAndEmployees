import { Button } from "react-bootstrap"

import useModal from "../../../hooks/useModal"
import useData from "../../../services/getData"

import TaskInformation from "../../TaskInformation/TaskInformation"

const CompleteTask = ({changeTaskAdded, dealID, employee, deal}) => {

    const {isShowModal, toggleModal, Modal} = useModal();
    const {editDeal} = useData();

    function changeTaskEmployee(){
        editDeal({status: "complete", title: deal.title, employeeID: employee.id}, dealID)
        .then(changeTaskAdded)
        
    }

    const content = isShowModal ? 
        <Modal>
            <TaskInformation deal={deal}/>
        </Modal> : null;

    return (
        <div style={{width: 250, display: "flex", justifyContent: "space-between"}} className="btns_wrapper">
            {content}
            <Button onClick={toggleModal} variant="primary">Подробнее</Button>
            <Button onClick={changeTaskEmployee} variant={deal.status == "work" ? "primary" : "success"} disabled = {deal.status == "complete"} >{deal.status == "work" ? "Выполнить!" : "Выполнено!"}</Button>
        </div>
    )
}

export default CompleteTask;