import useHttp from "../hooks/HttpHook"

const HOST = "https://admin-panel-25m8.onrender.com"
const PORT = 443

const useData = () => {
	const { httpRequest, loading, error } = useHttp()

	const getEmployee = async (id) => {
		const employees = await httpRequest(`${HOST}:${PORT}/employees/${id}`)
		return employees
	}

	const getEmployees = async () => {
		const employees = await httpRequest(`${HOST}:${PORT}/employees`)
		return employees
	}

	const setEmployees = async (body) => {
		return await httpRequest(
			`${HOST}:${PORT}/employees`,
			"POST",
			JSON.stringify(body)
		)
	}

	const editEmployee = async (body, id) => {
		return await httpRequest(
			`${HOST}:${PORT}/employees/${id}`,
			"PUT",
			JSON.stringify(body)
		)
	}

	const deleteEmployees = async (id) => {
		return await httpRequest(`${HOST}:${PORT}/employees/${id}`, "DELETE")
	}

	const getDeals = async () => {
		const deals = await httpRequest(`${HOST}:${PORT}/deals`)
		return deals
	}

	const getDeal = async (id) => {
		const deals = await httpRequest(`${HOST}:${PORT}/deals/${id}`)
		return deals
	}

	const setDeal = async (body) => {
		const dataToSend = {
			...body,
			employee: "nobody",
			status: "new",
		}
		return await httpRequest(
			`${HOST}:${PORT}/deals/`,
			"POST",
			JSON.stringify(dataToSend)
		)
	}

	const editDeal = async (body, id) => {
		return await httpRequest(
			`${HOST}:${PORT}/deals/${id}`,
			"PUT",
			JSON.stringify(body)
		)
	}

	const deleteDeal = async (id) => {
		return await httpRequest(`${HOST}:${PORT}/deals/${id}`, "DELETE")
	}

	return {
		loading,
		error,

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
	}
}

export default useData
