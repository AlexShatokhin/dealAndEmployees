import { useState } from "react";

const TasksModal = ({index, item}) => {
    const [moreInfo, setMoreInfo] =  useState(false);


    function showMoreInfo(){
        setMoreInfo(!moreInfo)
    }

    return (
        <p className="popup_item"> 
            <div className="popup_item-main">
                <span>{index+1}. </span>
                <div className="popup_item-text">{item.title}</div>
                <div onClick={showMoreInfo} className={moreInfo ? "popup_item-accordion popup_reverse" : "popup_item-accordion"}><i class="fas fa-chevron-down"></i></div>
            </div>
            {moreInfo ?<div className="popup_item-info">{item.moreInfo}</div>: null}

        </p>
    )
}

export default TasksModal