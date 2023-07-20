import { useState, useEffect } from "react";
import ChooseEmployee from "../../EmployerComponents/ChooseEmployee/ChooseEmployee";

import DealsButtons from "../DealsButtons/DealsButtons";
import useData from "../../../services/getData";

const EmployerDealsItem = ({deal, index, dataEmp, dataDeals, taskAdded, changeTaskAdded}) => {

    const [chooseBlock, setChooseBlock] = useState(false);
    const [chosenEmp, setChosenEmp] = useState([]);
    const {getDeal} = useData();


    useEffect(()=>{
        getDeal(dataDeals[index].id)
        .then(res => setChosenEmp(res.map(item => ({id:item.id, login: item.login}))));
    }, [])

    function showChooseBlock(){
        setChooseBlock(!chooseBlock);
    }

    function getChosenEmps(){
        return chosenEmp;
    }

    function changeChosenEmp(emp){
        if(!chosenEmp.filter(employee =>  employee.id == emp.id).length){
            setChosenEmp([...chosenEmp, emp]); 
        } else {
            setChosenEmp(chosenEmp.filter(item => item.id != emp.id));
        }
        
    }

    return (
        <div key = {deal.id} className="deals_item">
            <div className="deals_item-text">
                <span className="deals_item-num">{index+1}.</span>
                <div className="deals_item-title">{deal.title}</div>
            </div>
            <DealsButtons
                        dataEmp = {dataEmp}
                        dataDeals = {dataDeals}
                        index = {index}
                        taskAdded = {taskAdded} 
                        changeTaskAdded={changeTaskAdded} 
                        dealID={deal.id}
                        getChosenEmps = {getChosenEmps}
                        showChooseBlock={showChooseBlock}
                        chooseBlock = {chooseBlock}/>

            {chooseBlock ? 
                <ChooseEmployee                 
                deal={deal} 
                index = {index}
                dataEmp = {dataEmp}
                dataDeals = {dataDeals}
                changeChosenEmp = {changeChosenEmp}
                getChosenEmps = {getChosenEmps}/>
             : null}
        </div>  
    ) 
}

export default EmployerDealsItem;