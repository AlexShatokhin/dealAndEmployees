import { useState } from "react";
import { Button } from "react-bootstrap";

import ChooseEmployee from "./../ChooseEmployee/ChooseEmployee";
import TaskInformation from "../../TaskInformation/TaskInformation";

import useData from "../../../services/getData";
import useModal from "../../../hooks/useModal";

import "./DealsButtons.scss"


const DealsButtons = ({dataDeals, dealID, changeTaskAdded, taskAdded, index, dataEmp}) => {


    const [isChooseEmp, setIsChooseEmp] = useState(false);

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

    function changeChosenMod(){
        toggleModal();
        setIsChooseEmp(true);
    }

    function changeInfoMod(){
        toggleModal();
        setIsChooseEmp(false);
    }

    const content = isChooseEmp ? 
    <>
        <ChooseEmployee 
        dataEmp = {dataEmp}
        data = {dataDeals}
        initEmp={dataEmp.filter(item => item.id == dataDeals[index].employeeID)[0]} 
        toggleModal={toggleModal} 
        index={index} 
        changeCurrDeal={changeCurrDeal} />
    </> : 
    <>
        <TaskInformation deal={dataDeals.filter(item => item.id === dealID)[0]}/>
        
    </>;

    const showModal = isShowModal ? <Modal style = {!isChooseEmp ? {width: "800px"} : null}>{content}</Modal> : null;

    return (
        <div className="deals_item-buttons">    
            {showModal}
        <Button onClick={changeChosenMod} variant="primary">Назначить</Button>
        <Button onClick = {changeInfoMod} variant="primary">Подробнее</Button>
        <div onClick={onDeleteDeal}><i className="fa-solid fa-trash"></i></div>
    </div>
    )
}

export default DealsButtons