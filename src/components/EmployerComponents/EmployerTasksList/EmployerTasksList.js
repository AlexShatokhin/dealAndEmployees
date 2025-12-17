import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

import EmployerDealsItem from "../EmployerDealsItem/EmployerDealsItem";
import "../../TasksList/TasksList.scss"

const EmployerTasksList = ({loading}) => {

    const {deals} = useSelector(state => state.employer);  
    function renderDeals(){
        return deals.map((item, i)=> <EmployerDealsItem key={item.id} deal={item} index = {i} />)
    }

    const isLoading = loading ? 
    <Spinner style = {{
                    display: "block", 
                    width: "120px", 
                    height: "120px", 
                    margin: "50px auto",
                    borderWidth: "10px"
                }} 
            size="xxl"
            animation="border" 
            variant="primary"/> : null;

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