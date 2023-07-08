import { useEffect } from "react"
import { Spinner } from "react-bootstrap";

import DealsItem from "../../DealsItem/DealsItem";
import ChooseTask from "../ChooseTask/ChooseTask";

import useData from "../../../services/getData";
import useDeals from "../../../hooks/EditDeals";

const EmployeerTasksList = ({employee, data, renderProps, taskAdded, changeTaskAdded}) => {
    
    const {loading} = useData();
    const {deals, updateDeals} = useDeals()

    useEffect(updateDeals, [taskAdded])

    function renderDeals(){
        return data.map((item, i)=>{
            return (
                <DealsItem 
                deal={item} 
                index = {i}
                renderProps = {renderProps ? renderProps : ()=>{
                    return (
                        <ChooseTask 
                        deal={item}
                        employee={employee}
                        taskAdded = {taskAdded} 
                        changeTaskAdded={changeTaskAdded} 
                        dealID={item.id}/>
                    )
                }}/>
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

    const isContent = (data.length && !loading) ? renderDeals() : null;

    const isEmpty = (!loading && !data.length) ? 
    <p style = {{color: "#FFFFFF", 
                margin: "0 auto", 
                fontWeight: 600, 
                textAlign: "center", 
                fontSize: 35}}>
    Заданий пока нет!
    </p> : null;



    return (
        <div className="deals">
            {isLoading}
            {isContent}
            {isEmpty}
        </div>
    )
}

export default EmployeerTasksList;