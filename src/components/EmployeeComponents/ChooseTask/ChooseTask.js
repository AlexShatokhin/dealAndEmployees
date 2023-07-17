import { Button } from "react-bootstrap"

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";

import TaskInformation from "../../TaskInformation/TaskInformation";


const ChooseTask = ({changeTaskAdded, dealID, employee, deal}) => {

    const {isShowModal, toggleModal, Modal} = useModal();
    const{editDeal} = useData();

    function changeTaskEmployee(){
        editDeal({status: deal.status, title: deal.title, employeeID: employee.id}, dealID)
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
            <Button onClick={changeTaskEmployee} variant="primary" >Выбрать!</Button>
        </div>
    )
}

export default ChooseTask;