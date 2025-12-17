import useHttp from "../hooks/HttpHook"
const useDealApi = () => {
	const { httpRequest, loading, error } = useHttp()

	const getDeals = async () => {
		const deals = await httpRequest(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/deals`)
		return deals
	}

	const getDeal = async (id) => {
		const deals = await httpRequest(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/deals/${id}`)
		return deals
	}

	const setDeal = async (body) => {
		const dataToSend = {
			...body,
			employee: "nobody",
			status: "new",
		}
		return await httpRequest(
			`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/deals/`,
			"POST",
			JSON.stringify(dataToSend)
		)
	}

	const editDeal = async (body, id) => {
		return await httpRequest(
			`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/deals/${id}`,
			"PUT",
			JSON.stringify(body)
		)
	}

	const deleteDeal = async (id) => {
		return await httpRequest(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/deals/${id}`, "DELETE")
	}

	return {
		loading,
		error,

		getDeals,
		getDeal,
		setDeal,
		editDeal,
		deleteDeal,
	}
}

export default useDealApi
