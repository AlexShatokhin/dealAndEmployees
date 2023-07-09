import { useEffect } from "react"
import { Spinner } from "react-bootstrap";

import DealsItem from "../DealsItem/DealsItem";
import DealsButtons from "../EmployerComponents/DealsButtons/DealsButtons";

import useData from "../../services/getData"
import useDeals from "../../hooks/EditDeals";

import ChooseTask from "../EmployeeComponents/ChooseTask/ChooseTask";

import "./TasksList.scss"

const TasksList = ({data, changeTaskAdded, taskAdded, renderProps, employee}) => {

    const {loading} = useData();

    function renderDeals(){
        return data.map((item, i)=>{
            return (
                <DealsItem 
                deal={item} 
                index = {i}
                renderProps = {renderProps ? () => renderProps({changeTaskAdded, dealID: item.id, deal: item, employee}) : ()=>{
                    return (
                        <DealsButtons 
                        data = {data}
                        index = {i}
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

export default TasksList;