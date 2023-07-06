import { useState } from "react";

import useData from "../services/getData";

const useDeals = () => {

    const [deals, setDeals] = useState([]);
    const {getDeals, deleteDeal} = useData();


    function updateDeals(){
        getDeals()
        .then(onDealsLoaded)
    }

    function onDealsLoaded(deals){
        setDeals(deals);
    }

    function onDeleteDeal(ind){
        deleteDeal(ind)
        .then(updateDeals)
    }

    return {deals, updateDeals, onDeleteDeal}

}

export default useDeals;