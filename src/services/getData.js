import useHttp from "../hooks/HttpHook"


const useData = () => {

    const {httpRequest, loading, error} = useHttp();

    const getEmployers = async () => {
        const employers = await httpRequest("http://localhost:3000/employers");
        return employers;
    }

    const getEmployees = async () => {
        const employees = await httpRequest("http://localhost:3000/employees");
        return employees;
    }

    const getDeals = async () => {
        const deals = await httpRequest("http://localhost:3000/deals");
        return deals;
    }

    return {loading, error, getEmployers, getEmployees, getDeals};

}

export default useData;