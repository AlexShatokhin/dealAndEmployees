import { useState } from "react";
import { Button } from "react-bootstrap"

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";

import TaskInformation from "../../TaskInformation/TaskInformation";

const ChooseTask = ({changeTaskAdded, dealID, employee, deal}) => {

    const {isShowModal, toggleModal, Modal} = useModal();
    const [disabled, setDisabled] = useState(false);
    const { editDeal } = useData();

    function changeTaskEmployee(){
        setDisabled(true)
        editDeal({status: "work", employeeID: employee[0].id, action: "CHOOSE_DEAL"}, dealID)
        .then(changeTaskAdded)
        
    }

    const content = isShowModal ? 
    <Modal>
        <TaskInformation deal={deal}/>
    </Modal> : null;

    return (
        <div style={{width: 230, display: "flex", justifyContent: "space-between"}} className="btns_wrapper">
            {content}
            <Button onClick={toggleModal} variant="primary">Подробнее</Button>
            <Button disabled = {disabled} onClick={changeTaskEmployee} variant="primary" >Выбрать!</Button>
        </div>
    )
}

export default ChooseTask;