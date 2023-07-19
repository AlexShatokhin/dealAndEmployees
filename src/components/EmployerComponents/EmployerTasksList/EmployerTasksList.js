import { useState } from "react";
import { Spinner } from "react-bootstrap";

import DealsItem from "../EmployerDealsItem/EmployerDealsItem";
import EmployerDealsItem from "../EmployerDealsItem/EmployerDealsItem";
import DealsButtons from "../../EmployerComponents/DealsButtons/DealsButtons";

import useData from "../../../services/getData"

import "../../TasksList/TasksList.scss"

const EmployerTasksList = ({data, changeTaskAdded, taskAdded, renderProps, employee, dataEmp}) => {

    const {loading, editDeal} = useData();



    const [chooseBlock, setChooseBlock] = useState(false);

    function showChooseBlock(){
        setChooseBlock(!chooseBlock);
    }
    
    function renderDeals(){
        return data.map((item, i)=>{
            
            return (
                <EmployerDealsItem 
                deal={item} 
                index = {i}
                dataEmp = {dataEmp}
                dataDeals = {data}
                taskAdded = {taskAdded} 
                changeTaskAdded={changeTaskAdded} />
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

export default EmployerTasksList;