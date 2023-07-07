import { useEffect } from "react";

import useDeals from "../../../hooks/EditDeals";

const CountOfTasks = ({employee}) => {

    const {updateDeals, deals} = useDeals();

    useEffect(updateDeals, [])

    return (
        <div style={{color:"#FFFFFF"}} className="count_of_tasks">Заданий: {deals.filter(item => item.employee == employee.login).length}</div>
    )
}

export default CountOfTasks;