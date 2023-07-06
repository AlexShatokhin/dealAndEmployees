import { useState } from "react";

import useData from "../services/getData";

const useEmployees = () => {

    const [employeesList, setEmployeesList] = useState([]);

    const {getEmployees, deleteEmployees} = useData();


    function updateEmployees(){
        getEmployees()
        .then(onEmployeesLoaded)
    }

    function onEmployeesLoaded(list){
        setEmployeesList(list);
    }
    
    function onDeleteEmployee(emp){

        deleteEmployees(emp.id)
        .then(updateEmployees)

    }


    return {employeesList, updateEmployees, onDeleteEmployee}

}

export default useEmployees;