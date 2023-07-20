import { Spinner } from "react-bootstrap";

import DealsItem from "../DealsItem/DealsItem";
import DealsButtons from "../EmployerComponents/DealsButtons/DealsButtons";

import useData from "../../services/getData"

import "./TasksList.scss"

const TasksList = ({data, changeTaskAdded, taskAdded, renderProps, employee, dataEmp}) => {

    const {loading, editDeal} = useData();

    function changeCurrDeal(ind, chosenEmp){
        editDeal({action:"RECHOOSE_EMP", status: chosenEmp.length ? "work" : "new", employeeID: chosenEmp.map(item => item.id)}, ind)
        .then(changeTaskAdded)
        
    }

    function renderDeals(){
        return data.map((item, i)=>{
            
            return (
                <DealsItem 
                deal={item} 
                index = {i}
                dataEmp = {dataEmp}
                dataDeals = {data}
                changeCurrDeal = {changeCurrDeal}
                renderProps = {renderProps ? () => renderProps({changeTaskAdded, dealID: item.id, deal: item, employee, data}) : ()=>{
                    return (
                        <DealsButtons
                        dataEmp = {dataEmp}
                        dataDeals = {data}
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