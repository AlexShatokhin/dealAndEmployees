import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

import EmployerDealsItem from "../EmployerDealsItem/EmployerDealsItem";

import useData from "../../../services/getData"

import "../../TasksList/TasksList.scss"

const EmployerTasksList = () => {

    const {deals} = useSelector(state => state.employer);
    const {loading} = useData();
  
    function renderDeals(){
        return deals.map((item, i)=> <EmployerDealsItem deal={item} index = {i} />)
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

    const isContent = (deals.length && !loading) ? renderDeals() : null;

    const isEmpty = (!loading && !deals.length) ? 
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