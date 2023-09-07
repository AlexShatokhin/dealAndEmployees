import useHttp from "../hooks/HttpHook"

const useData = () => {
    const {httpRequest, loading, error} = useHttp();

    const getEmployee = async (id) => {
        const employees = await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/employees/${id}`);
        return employees;
    }

    const getEmployees = async () => {
        const employees = await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/employees`);
        return employees;
    }

    const setEmployees = async (body) => {
        return await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/employees`, "POST", JSON.stringify(body));
    }

    const editEmployee = async (body, id) => {
        return await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/employees/${id}`, "PUT", JSON.stringify(body))
    }

    const deleteEmployees = async (id) => {
        return await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/employees/${id}`, "DELETE");
    }

    const getDeals = async () => {
        const deals = await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/deals`);
        return deals;
    }

    const getDeal = async (id) => {
        const deals = await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/deals/${id}`);
        return deals;
    }

    const setDeal = async (body) => {
        const dataToSend = {
            ...body, employee: "nobody", status: "new"
        }
        return await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/deals/`, "POST", JSON.stringify(dataToSend));
    }

    const editDeal = async (body, id) => {
        return await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/deals/${id}`, "PUT", JSON.stringify(body));
    }

    const deleteDeal = async (id) => {
        return await httpRequest(`http://localhost:${process.env.REACT_APP_PORT}/deals/${id}`, "DELETE");
    }

    return {
        loading, error, 

        getEmployee, 
        editEmployee,

        getEmployees, 
        setEmployees, 
        deleteEmployees, 

        getDeals, 

        getDeal, 
        setDeal, 
        editDeal,
        deleteDeal, 
    };

}

export default useData;