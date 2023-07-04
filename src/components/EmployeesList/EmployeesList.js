import { useEffect, useState } from "react"
import { Spinner, Button } from "react-bootstrap";

import useData from "../../services/getData"

import "./EmployeesList.scss"

const EmployeesList = () => {

    const [showModal, setShowModal] = useState(false);
    const [employeesList, setEmployeesList] = useState([]);
    const {loading, error, getEmployees} = useData();

    useEffect(updateEmployees, [])

    function updateEmployees(){
        getEmployees()
        .then(onEmployeesLoaded)
    }

    function onEmployeesLoaded(list){
        setEmployeesList(list);
    }

    function renderEmployees(){
        return employeesList.map((item)=>{
            return (
                <div className="employees_list-item">
                    <div className="employees_list-item-name">{item.name}</div>
                    <Button variant="primary">Задания</Button>
                </div>
            )
        })
    }

    const isLoading = loading ? <Spinner style = {{display: "block", width: "100px", height: "100px", margin: "50px auto"}} animation="border" variant="danger"/> : null;
    const isContent = employeesList.length != 0 ? renderEmployees() : null;
    return (
        <div className="employees_list">
            {isLoading}
            {isContent}
        </div>
    )
}

export default EmployeesList;