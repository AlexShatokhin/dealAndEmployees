import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap";

import DealsItem from "../DealsItem/DealsItem";

import useModal from "../../hooks/useModal";
import useData from "../../services/getData"
import useDeals from "../../hooks/EditDeals";

import "./TasksList.scss"

const TasksList = ({taskAdded}) => {

    const [currDeal, setCurrDeal] = useState(null);

    const {loading, error} = useData();
    const{Modal, toggleModal, isShowModal} = useModal();
    const {deals, onDeleteDeal, updateDeals} = useDeals()

    useEffect(()=>{
        updateDeals();
    }, [taskAdded])


    function changeCurrDeal(ind){
        setCurrDeal(deals[ind]);
    }

    function renderDeals(){
        return deals.map((item, i)=>{
            return (
                <DealsItem 
                deal={item} 
                changeCurrDeal = {()=>changeCurrDeal(i)}
                toggleModal = {toggleModal}
                onDeleteDeal = {onDeleteDeal} />
            ) 
        })
    }


    const isLoading = loading ? 
    <Spinner style = {{
                        display: "block", 
                        width: "100px", 
                        height: "100px", 
                        margin: "50px auto"
                    }} 
            animation="border" 
            variant="danger"/> : null;

    const isContent = (deals.length && !loading) ? renderDeals() : null;
    const isEmpty = (!loading && !deals.length) ? 
    <p style = {{color: "#FFFFFF", 
                margin: "0 auto", 
                fontWeight: 600, 
                textAlign: "center", 
                fontSize: 35}}>
    Заданий пока нет!
    </p> : null;

    const modal = isShowModal ? 
    <Modal>
        <div className="popup_title"> <span>Название: </span> {currDeal.title}</div>
        <div className="popup_info"> <span>Подробная информация:</span> {currDeal.moreInfo}</div>
        <div className="popup_employee"> <span>Работник:</span> {currDeal.name}</div>
    </Modal> : null;


    return (
        <div className="deals">
            {isLoading}
            {isContent}
            {isEmpty}
            {modal}
        </div>
    )

}

export default TasksList;