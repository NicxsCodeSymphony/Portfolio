import type { Works } from "@/types/Works";
import { useEffect, useState } from "react";
import axios from "axios";

export const useWorkExperiencePage = () => {
    const [data, setData] = useState<Works[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get('/api/works')
                const rawData = res.data

                const cleaned: Works[] = Object.values(rawData)
                setData(cleaned)
            }
            catch(err: unknown){
                if(err instanceof Error){
                    setError(err.message)
                }else{
                    setError("Unknown error")
                }
            }finally{
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return {data, loading, error}
}