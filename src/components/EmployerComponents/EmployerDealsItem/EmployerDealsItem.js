import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChooseEmployee from "../../EmployerComponents/ChooseEmployee/ChooseEmployee";

import DealsButtons from "../DealsButtons/DealsButtons";
import useData from "../../../services/getData";

const EmployerDealsItem = ({deal, index}) => {

    const [chooseBlock, setChooseBlock] = useState(false);
    const [chosenEmp, setChosenEmp] = useState([]);
    const {deals} = useSelector(state => state.employer);
    const {getDeal} = useData();

    useEffect(()=>{
        getDeal(deals[index].id)
        .then(res => setChosenEmp(res.map(item => ({id:item.id, login: item.login}))));
    }, [])

    function showChooseBlock(){
        setChooseBlock(!chooseBlock);
    }

    function changeChosenEmp(emp){
        if(!chosenEmp.filter(employee => +employee.id === +emp.id).length){
            setChosenEmp([...chosenEmp, emp]); 
        } else {
            setChosenEmp(chosenEmp.filter(item => +item.id !== +emp.id));
        }
        
    }

    return (
        <div key = {deal.id} className="deals_item">
            <div className="deals_item-text">
                <span className="deals_item-num">{index+1}.</span>
                <div className="deals_item-title">{deal.title}</div>
            </div>
            <DealsButtons
                dealID={deal.id}
                chosenEmps = {chosenEmp}
                showChooseBlock={showChooseBlock}/>

            {chooseBlock ? 
                <ChooseEmployee                 
                    changeChosenEmp = {changeChosenEmp}
                    chosenEmps = {chosenEmp}/>
             : null}
        </div>  
    ) 
}

export default EmployerDealsItem;