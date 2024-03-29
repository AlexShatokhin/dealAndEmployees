import { useCallback, useState } from "react";

const useHttp = () => {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const httpRequest = useCallback(async (url, method = "GET", body = null, headers = {"Content-type": "application/json"})=>{

        setLoading(true);
        setError(false);

        try{
            const response = await fetch(url, {method, headers, body});

            if(response.ok){
                setLoading(false);
                return response.json();
            } else {
                setLoading(false);
                throw new Error("Couldn`t fetch!")
            }
        } catch(e){
            setError(true);
            console.error(e);
        }

    })

    return {loading, error, httpRequest}

}

export default useHttp;