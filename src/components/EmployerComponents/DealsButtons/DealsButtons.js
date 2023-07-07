import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import TaskModal from "../../TaskModal/TaskModal";

import useModal from "../../../hooks/useModal";
import useDeals from "../../../hooks/EditDeals";

const DealsButtons = ({dealID, changeTaskAdded, taskAdded, index}) => {

    const [currDeal, setCurrDeal] = useState(null);
    const [editedMode, setEditedMode] = useState(false);

    const { Modal, toggleModal, isShowModal} = useModal();
    const { deals, onDeleteDeal, updateDeals} = useDeals()

    useEffect(updateDeals, [taskAdded])

    function changeCurrDeal(ind){
        setCurrDeal(deals[ind]);
    }

    function changeEditedMode(value = true){
        setEditedMode(value)
    }


    const modal = isShowModal && !editedMode ? 
    <Modal>
        <div className="popup_title"> <span>Название: </span> {currDeal.title}</div>
        <div className="popup_info"> <span>Подробная информация:</span> {currDeal.moreInfo}</div>
        <div className="popup_employee"> <span>Работник:</span> {currDeal.name}</div>
    </Modal> : isShowModal && editedMode ? 
    <>
        <TaskModal 
        changeShowModal={toggleModal} 
        Modal = {Modal} 
        isEdit = {true} 
        initTitle={currDeal.title}
        initMoreInfo={currDeal.moreInfo}
        initEmployee={currDeal.employee}
        id = {currDeal.id}
        changeTaskAdded={changeTaskAdded}/>
    </>
        : null;

    return (
        <div className="deals_item-buttons">
            {modal}
        <Button onClick={()=>{changeCurrDeal(index); changeEditedMode(false); toggleModal()}} variant="primary">Подробнее</Button>
        <Button onClick={()=>{changeCurrDeal(index); changeEditedMode(); toggleModal()}} variant="primary">Изменить</Button>
        <Button onClick={()=> {onDeleteDeal(dealID); changeTaskAdded()} } variant="danger">Удалить</Button>
    </div>
    )
}

export default DealsButtons