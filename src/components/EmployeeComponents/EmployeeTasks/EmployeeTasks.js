import { useEffect, useState } from "react";

import useData from "../../../services/getData";
import useDeals from "../../../hooks/EditDeals";

const EmployeeTasks = ({employee}) => {

    const [myDeals, setMyDeals] = useState();

    const{getDeals, loading} = useData();

    useEffect(updateDeals, []);


    function updateDeals(){
        getDeals()
        .then(onDealsLoaded)
    }

    function onDealsLoaded(deals){
        setMyDeals(deals.filter((item) => item.employee == employee.login));
    }


    function renderMyDeals(){
        return myDeals.map((item, i) => {
            return (
                <div className="deals_item">
                    <div className="deals_item-text">
                        <div className="deals_item-num">{i+1}. </div>
                        <div className="deals_item-title">{item.title}</div>
                    </div>
                </div>
            )
        })
    }


    const isLoading = loading ? <h1>Hello!</h1> : null;
    const content = myDeals ? renderMyDeals() : <h1>OOps</h1>;
    return (
        <div className="deals">
            {isLoading}
            {content}
        </div>
    )

}

export default EmployeeTasks;