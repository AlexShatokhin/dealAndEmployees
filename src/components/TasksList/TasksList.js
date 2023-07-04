import { useEffect, useState } from "react"
import { Spinner, Button } from "react-bootstrap";

import useData from "../../services/getData"

import "./TasksList.scss"

const TasksList = ({flag}) => {

    const [deals, setDeals] = useState([]);
    const {loading, error, getDeals} = useData();

    useEffect(()=>{
        getDeals()
        .then(onDealsLoaded)
    }, [flag])

    function onDealsLoaded(deals){
        setDeals(deals);
    }

    function renderDeals(){
        return deals.map((item)=>{
            return (
              <div key = {item.id} className="deals_item">
                    <div className="deals_item-title">{item.title}</div>
                    <div className="deals_item-perfomer">{item.name}</div>
                    <div className="deals_item-buttons">
                        <Button variant="primary">Подробнее</Button>
                        <Button variant="primary">Изменить</Button>
                    </div>
              </div>  
            ) 
        })
    }


    const isLoading = loading ? <Spinner animation="border" variant="primary"/> : null;
    const isContent = deals.length ? renderDeals() : null;
    return (
        <div className="deals">
            {isLoading}
            {isContent}
        </div>
    )

}

export default TasksList;