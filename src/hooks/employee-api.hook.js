import useHttp from "./HttpHook"
const useEmployeeApi = () => {
	const { httpRequest, loading, error } = useHttp()

	const getEmployee = async (id) => {
		const employees = await httpRequest(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/employees/${id}`)
		return employees
	}

	const getEmployees = async () => {
		const employees = await httpRequest(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/employees`)
		return employees
	}

	const setEmployees = async (body) => {
		return await httpRequest(
			`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/employees`,
			"POST",
			JSON.stringify(body)
		)
	}

	const editEmployee = async (body, id) => {
		return await httpRequest(
			`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/employees/${id}`,
			"PUT",
			JSON.stringify(body)
		)
	}

	const deleteEmployees = async (id) => {
		return await httpRequest(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/employees/${id}`, "DELETE")
	}


	return {
		loading,
		error,

		getEmployee,
		editEmployee,

		getEmployees,
		setEmployees,
		deleteEmployees,
	}
}

export default useEmployeeApi
