import { useEffect, useState } from "react";
import useDealApi from "../../../hooks/deal-api.hook";

const DealItem = ({deal, ind, refreshData, employeeData}) => {
    
    const [isShowInfo, setIsShowInfo] = useState(false);
    const {editDeal} = useDealApi();

    useEffect(()=>setIsShowInfo(false), [deal])

    function changeDeal(deal){
        editDeal({employeeID: employeeData.personalData.id, status: deal.status, action: "DEL_EMP"}, deal.taskID)
        .then(() => refreshData())
        .catch(err => console.log(err))
    }

    function changeInfoMode(){
        setIsShowInfo(!isShowInfo)
    }
    return (
        <div className="task">
            <div className="task_title"> <span>{ind}. </span>{deal.title}</div>
            <div className="task_buttons">
                <div className="task_is_complete">{deal.status === "complete" ?<i style = {{color: "#00FF15"}} className ="fa-solid fa-check"></i> : null}</div>
                <div onClick={()=>{changeDeal(deal)}} className="task_delete"> <i className="fa-solid fa-trash"></i></div>
                <div className="task_info" onClick={changeInfoMode}><i style={{transform: isShowInfo ? "rotate(180deg)" : "rotate(0deg)", transition: ".2s all"}}  className="fa-solid fa-chevron-down"></i></div>
            </div>
            {isShowInfo ? 
                <>
                    <hr />
                    <div className="information_wrapper">
                        {deal.information}
                    </div>
                </> : null}
        </div>
    )  
}

export default DealItem;