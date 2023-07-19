import { useState } from "react";
import TaskInformation from "../TaskInformation/TaskInformation";
import ChooseEmployee from "../EmployerComponents/ChooseEmployee/ChooseEmployee";


const DealsItem = ({deal, renderProps, index, dataEmp, changeCurrDeal, initEmp, dataDeals}) => {

    const [chooseBlock, setChooseBlock] = useState(false);

    function showChooseBlock(){
        setChooseBlock(!chooseBlock);
    }

    return (
        <div key = {deal.id} className="deals_item">
            <div className="deals_item-text">
                <span className="deals_item-num">{index+1}.</span>
                <div className="deals_item-title">{deal.title}</div>
            </div>
                {renderProps()}

            {chooseBlock ? 
                <ChooseEmployee                 
                deal={deal} 
                index = {index}
                dataEmp = {dataEmp}
                dataDeals = {dataDeals}
                changeCurrDeal = {changeCurrDeal}/>
             : null}
        </div>  
    ) 
}

export default DealsItem;