import { useState } from "react";
import { Button } from "react-bootstrap";

import ChooseEmployee from "./../ChooseEmployee/ChooseEmployee";
import TaskInformation from "../../TaskInformation/TaskInformation";

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";

import "./DealsButtons.scss"


const DealsButtons = ({dataDeals, dealID, changeTaskAdded, taskAdded, index, dataEmp, showChooseBlock, getChosenEmps}) => {


    const [isChooseEmp, setIsChooseEmp] = useState(false);
    const [chooseBlock, setChooseBlock] = useState(false);

    const { Modal, toggleModal, isShowModal} = useModal();
    const {editDeal, deleteDeal, getDeal} = useData();


    function changeCurrDeal(chosenEmp){
        editDeal({action:"RECHOOSE_EMP", status: getChosenEmps().length ? "work" : "new", employeeID: getChosenEmps().map(item => item.id)}, dealID)
        .then(changeTaskAdded)
        
    }


    function onDeleteDeal(){
        deleteDeal(dealID)
        .then(changeTaskAdded);
    }



    function changeInfoMod(){
        toggleModal();
        setIsChooseEmp(false);
    }
    const content = isChooseEmp ? 
    <>
        <ChooseEmployee 
        dataEmp = {dataEmp}
        dataDeals = {dataDeals}
        initEmp={dataEmp.filter(item => item.id == dataDeals[index].employeeID)} 
        toggleModal={toggleModal} 
        index={index} 
        changeCurrDeal={changeCurrDeal} />
    </> : null;

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