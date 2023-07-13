import { Button } from "react-bootstrap";

import ChooseEmployee from "./../ChooseEmployee/ChooseEmployee";

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";
import useDeals from "../../../hooks/EditDeals";

import "./DealsButtons.scss"

const DealsButtons = ({dataDeals, dealID, changeTaskAdded, taskAdded, index, dataEmp}) => {


    const { Modal, toggleModal, isShowModal} = useModal();
    const {editDeal, deleteDeal} = useData();

    function changeCurrDeal(ind, chosenEmp){
        editDeal({status: "work", title: dataDeals[ind].title, employeeID: chosenEmp.id}, dealID)
        .then(changeTaskAdded)
        
    }

    function onDeleteDeal(){
        deleteDeal(dealID)
        .then(changeTaskAdded);
    }

    const modal = isShowModal ? 
    <Modal>
        <ChooseEmployee 
        dataEmp = {dataEmp}
        data = {dataDeals}
        initEmp={dataEmp.filter(item => item.id == dataDeals[index].employeeID)[0]} 
        toggleModal={toggleModal} 
        index={index} 
        changeCurrDeal={changeCurrDeal} />
    </Modal> : null;

    return (
        <div className="deals_item-buttons">    
            {modal}
        <Button onClick={toggleModal} variant="primary">Назначить</Button>
        <div onClick={onDeleteDeal}><i className="fa-solid fa-trash"></i></div>
    </div>
    )
}

export default DealsButtons