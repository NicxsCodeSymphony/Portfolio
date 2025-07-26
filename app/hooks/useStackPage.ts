import type { Stacks } from "@/types/Stacks";
import { useEffect, useState } from "react";
import axios from "axios";

export const useStackPage = () => {
    const [data, setData] = useState<Stacks[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get('/api/stacks')
                const rawData = res.data
                const cleaned: Stacks[] = Object.values(rawData)
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