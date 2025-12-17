import { useState } from "react";
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux";

import { toggleTaskAdded } from "../EmployeeSlice";
import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";

import TaskInformation from "../../TaskInformation/TaskInformation";

const ChooseTask = ({dealID, employee, deal}) => {

    const dispatch = useDispatch();
    const {isShowModal, toggleModal, Modal} = useModal();
    const [disabled, setDisabled] = useState(false);
    const { editDeal } = useData();

    function changeTaskEmployee(){
        setDisabled(true)
        editDeal({status: "work", employeeID: employee[0].id, action: "CHOOSE_DEAL"}, dealID)
        .then(() => dispatch(toggleTaskAdded()))
        .catch(err => console.log(err))
        
    }

    const content = isShowModal ? 
    <Modal>
        <TaskInformation deal={deal}/>
    </Modal> : null;

    return (
        <div style={{width: 230, display: "flex", justifyContent: "space-between"}} className="btns_wrapper">
            {content}
            <Button onClick={toggleModal} variant="primary">Подробнее</Button>
            <Button disabled = {disabled} onClick={changeTaskEmployee} variant="primary">Выбрать!</Button>
        </div>
    )
}

export default ChooseTask;