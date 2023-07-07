import { useEffect } from "react";
import { Button } from "react-bootstrap";

import ChooseEmployee from "./../ChooseEmployee/ChooseEmployee";

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";
import useDeals from "../../../hooks/EditDeals";

const DealsButtons = ({dealID, changeTaskAdded, taskAdded, index}) => {


    const { Modal, toggleModal, isShowModal} = useModal();
    const { deals, onDeleteDeal, updateDeals} = useDeals()
    const {editDeal} = useData();

    useEffect(updateDeals, [taskAdded])

    function changeCurrDeal(ind, chosenEmp){
        editDeal({...deals[ind], employee: chosenEmp}, dealID);
    }

    const modal = isShowModal ? 
    <Modal>
        <ChooseEmployee initEmp={deals[index].employee} toggleModal={toggleModal} index={index} changeCurrDeal={changeCurrDeal} />
    </Modal> : null;

    return (
        <div className="deals_item-buttons">
            {modal}
        <Button onClick={toggleModal} variant="primary">Назначить</Button>
        <Button onClick={()=> {onDeleteDeal(dealID); changeTaskAdded()} } variant="danger"><i className="fa-solid fa-trash"></i></Button>
    </div>
    )
}

export default DealsButtons