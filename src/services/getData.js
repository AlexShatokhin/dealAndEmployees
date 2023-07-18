import useHttp from "../hooks/HttpHook"


const useData = () => {

    const {httpRequest, loading, error} = useHttp();

    const getEmployee = async (id) => {
        const employees = await httpRequest(`http://localhost:3000/employees/${id}`);
        return employees;
    }

    const getEmployees = async () => {
        const employees = await httpRequest("http://localhost:3000/employees");
        return employees;
    }

    const setEmployees = async (body) => {
        return await httpRequest("http://localhost:3000/employees", "POST", JSON.stringify(body));
    }

    const deleteEmployees = async (id) => {
        return await httpRequest(`http://localhost:3000/employees/${id}`, "DELETE");
    }

    const getDeals = async () => {
        const deals = await httpRequest("http://localhost:3000/deals");
        return deals;
    }

    const getDeal = async (id) => {
        const deals = await httpRequest(`http://localhost:3000/deals/${id}`);
        return deals;
    }

    const setDeal = async (body) => {
        const dataToSend = {
            ...body, employee: "nobody", status: "new"
        }
        return await httpRequest(`http://localhost:3000/deals/`, "POST", JSON.stringify(dataToSend));
    }

    const editDeal = async (body, id) => {
        return await httpRequest(`http://localhost:3000/deals/${id}`, "PUT", JSON.stringify(body));
    }

    const deleteDeal = async (id) => {
        return await httpRequest(`http://localhost:3000/deals/${id}`, "DELETE");
    }

    return {loading, error, getEmployee, getEmployees, getDeals, getDeal, setDeal, deleteDeal, setEmployees, deleteEmployees, editDeal};

}

export default useData;