import { Button } from "react-bootstrap";

const DealsItem = ({deal, changeCurrDeal, changeEditedMode ,toggleModal, onDeleteDeal}) => {
    return (
        <div key = {deal.id} className="deals_item">
              <div className="deals_item-title">{deal.title}</div>
              <div className="deals_item-perfomer">{deal.name}</div>
              <div className="deals_item-buttons">
                  <Button onClick={()=>{toggleModal(); changeCurrDeal(); changeEditedMode(false)}} variant="primary">Подробнее</Button>
                  <Button onClick={()=>{toggleModal(); changeCurrDeal(); changeEditedMode()}} variant="primary">Изменить</Button>
                  <Button onClick={()=>onDeleteDeal(deal.id)} variant="danger">Удалить</Button>
              </div>
        </div>  
    ) 
}

export default DealsItem;