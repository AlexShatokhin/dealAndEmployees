import { useEffect } from "react";
import { Button } from "react-bootstrap";

import ChooseEmployee from "./../ChooseEmployee/ChooseEmployee";

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";
import useDeals from "../../../hooks/EditDeals";

import "./DealsButtons.scss"

const DealsButtons = ({dealID, changeTaskAdded, taskAdded, index}) => {


    const { Modal, toggleModal, isShowModal} = useModal();
    const { deals, onDeleteDeal, updateDeals} = useDeals()
    const {editDeal} = useData();

    useEffect(updateDeals, [taskAdded])

    function changeCurrDeal(ind, chosenEmp){
        editDeal({...deals[ind], employee: chosenEmp}, dealID);
        changeTaskAdded();
    }

    const modal = isShowModal ? 
    <Modal>
        <ChooseEmployee 
        initEmp={deals[index].employee} 
        toggleModal={toggleModal} 
        index={index} 
        changeCurrDeal={changeCurrDeal} />
    </Modal> : null;

    return (
        <div className="deals_item-buttons">    
            {modal}
        <Button onClick={toggleModal} variant="primary">Назначить</Button>
        <div onClick={()=> {onDeleteDeal(dealID); changeTaskAdded()} }><i className="fa-solid fa-trash"></i></div>
    </div>
    )
}

export default DealsButtons