import { useEffect, useState } from "react";
import useData from "../../../services/getData"

const CountOfTasks = ({employee}) => {

    const [dealsList, setDealsList] = useState([]);
    const {getDeals} = useData();

    useEffect(()=>{
        updateDeals();
    }, [])

    function updateDeals(){
        getDeals()
        .then(onDealsLoaded)
    }

    function onDealsLoaded(list){
        setDealsList(list)
    }

    return (
        <div style={{color:"#FFFFFF"}} className="count_of_tasks">Заданий: {dealsList.filter(item => item.employee == employee.login).length}</div>
    )
}

export default CountOfTasks;