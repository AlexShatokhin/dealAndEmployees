import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"

import { toggleTaskAdded } from "../EmployeeSlice";
import useModal from "../../../hooks/useModal"
import useData from "../../../services/getData"

import TaskInformation from "../../TaskInformation/TaskInformation"

const CompleteTask = ({employee, deal}) => {

    const dispatch = useDispatch();
    const {isShowModal, toggleModal, Modal} = useModal();
    const {editDeal} = useData();


    function changeTaskEmployee(){
        editDeal({status: "complete", employeeID: employee[0].id}, deal.taskID)
        .then(() => dispatch(toggleTaskAdded()))
        .catch(err => console.log(err))
        
    }

    const content = isShowModal ? 
        <Modal>
            <TaskInformation deal={deal}/>
        </Modal> : null;

    return (
        <div style={{width: 250, display: "flex", justifyContent: "space-between"}} className="btns_wrapper">
            {content}
            <Button onClick={toggleModal} variant="primary">Подробнее</Button>
            <Button 
                onClick={changeTaskEmployee} 
                variant={deal.status === "complete" ? "success" : "primary"} 
                disabled = {deal.status === "complete"} >
                {!deal.status === "complete" ? "Выполнить!" : "Выполнено!"}
            </Button>
        </div>
    )
}

export default CompleteTask;