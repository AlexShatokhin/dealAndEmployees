import { useEffect, useState } from "react"
import { Spinner, Button } from "react-bootstrap";

import useData from "../../services/getData"

import "./TasksList.scss"

const TasksList = ({taskAdded}) => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [currDeal, setCurrDeal] = useState(null);
    const [deals, setDeals] = useState([]);
    const {loading, error, getDeals, deleteDeal} = useData();

    useEffect(()=>{
        updateDeals();
    }, [taskAdded])

    function updateDeals(){
        getDeals()
        .then(onDealsLoaded)
    }

    function onDealsLoaded(deals){
        setDeals(deals);
    }

    function toggleModal(){
        setIsShowModal(!isShowModal);

    }

    function changeCurrDeal(ind){
        setCurrDeal(deals[ind]);
    }

    function onDeleteDeal(ind){
        deleteDeal(ind)
        .then(updateDeals)
    }

    function renderDeals(){
        return deals.map((item, i)=>{
            return (
              <div key = {item.id} className="deals_item">


                    <div className="deals_item-title">{item.title}</div>
                    <div className="deals_item-perfomer">{item.name}</div>
                    <div className="deals_item-buttons">
                        <Button onClick={()=>{toggleModal(); changeCurrDeal(i)}} variant="primary">Подробнее</Button>
                        <Button variant="primary">Изменить</Button>
                        <Button onClick={()=>onDeleteDeal(item.id)} variant="danger">Удалить</Button>
                    </div>
              </div>  
            ) 
        })
    }


    const isLoading = loading ? <Spinner style = {{display: "block", width: "100px", height: "100px", margin: "50px auto"}} animation="border" variant="danger"/> : null;
    const isContent = deals.length && !loading ? renderDeals() : null;
    const isEmpty = !loading && !deals.length ? <p style = {{color: "#FFFFFF", margin: "0 auto", fontWeight: 600, textAlign: "center", fontSize: 35}}>Заданий пока нет!</p> : null;
    const modal = isShowModal ? (
        <div onClick={(e)=>{return e.target.classList.contains("popup")? toggleModal() : null}} className="popup">
            <div className="popup_content">
                <div onClick={toggleModal} className="close_btn">&#10010;</div>
                <div className="popup_title"> <span>Название: </span> {currDeal.title}</div>
                <div className="popup_info"> <span>Подробная информация:</span> {currDeal.moreInfo}</div>
                <div className="popup_employee"> <span>Работник:</span> {currDeal.name}</div>
            </div>

        </div>
    ) : null;
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