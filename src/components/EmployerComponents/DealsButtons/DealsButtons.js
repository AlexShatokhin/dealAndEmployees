import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toggleTaskAdded } from "../EmployerSlice";
import TaskInformation from "../../TaskInformation/TaskInformation";

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";

import "./DealsButtons.scss"

const DealsButtons = ({dealID, showChooseBlock, chosenEmps}) => {

    const {deals} = useSelector(state => state.employer);
    const dispatch = useDispatch();
    const {Modal, toggleModal, isShowModal} = useModal();
    const {editDeal, deleteDeal} = useData();

    function refreshData(){
        dispatch(toggleTaskAdded());
    }

    function changeCurrDeal(){
        editDeal({action:"RECHOOSE_EMP", employeeID: chosenEmps.map(item => item.id), status: "work"}, dealID)
        .then(refreshData)
    }

    function onDeleteDeal(){
        deleteDeal(dealID)
        .then(refreshData);
    }

    const showModal = isShowModal ? 
    <Modal style = {{width: "800px"}}>
        <TaskInformation deal={deals.filter(item => item.id === dealID)[0]}/>
    </Modal> : null;

    return (
        <div className="deals_item-buttons">    
            {showModal}
            <Button onClick={()=>{showChooseBlock(); changeCurrDeal()}} variant="primary">Назначить</Button>
            <Button onClick = {toggleModal} variant="primary">Подробнее</Button>
            <div onClick={onDeleteDeal}><i className="fa-solid fa-trash"></i></div>
        </div>
    )
}

export default DealsButtons