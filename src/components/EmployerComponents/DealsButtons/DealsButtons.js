import { Button } from "react-bootstrap";

import TaskInformation from "../../TaskInformation/TaskInformation";

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";

import "./DealsButtons.scss"


const DealsButtons = ({dataDeals, dealID, changeTaskAdded, index, dataEmp, showChooseBlock, getChosenEmps}) => {

    const { Modal, toggleModal, isShowModal} = useModal();
    const {editDeal, deleteDeal} = useData();


    function changeCurrDeal(){
        editDeal({action:"RECHOOSE_EMP", employeeID: getChosenEmps().map(item => item.id), status: "work"}, dealID)
        .then(changeTaskAdded)
        
    }

    function onDeleteDeal(){
        deleteDeal(dealID)
        .then(changeTaskAdded);
    }



    function changeInfoMod(){
        toggleModal();
    }

    const showModal = isShowModal ? 
    <Modal style = {{width: "800px"}}>
        <TaskInformation deal={dataDeals.filter(item => item.id === dealID)[0]}/>
    </Modal> : null;

    return (
        <div className="deals_item-buttons">    
            {showModal}
        <Button onClick={()=>{showChooseBlock(); changeCurrDeal()}} variant="primary">Назначить</Button>
        <Button onClick = {changeInfoMod} variant="primary">Подробнее</Button>
        <div onClick={onDeleteDeal}><i className="fa-solid fa-trash"></i></div>
    </div>
    )
}

export default DealsButtons