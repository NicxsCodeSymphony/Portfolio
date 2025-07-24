import { PersonalInfo } from "@/types/PersonalInfo";
import { SocialLinks } from "@/types/SocialLinks";
import { ContactPage } from "@/types/contactPage";
import { useEffect, useState } from "react";
import axios from "axios";

export type ContactPageWithNested = Omit<ContactPage, 'uid'> & {
    social: SocialLinks
    personalInfo: PersonalInfo
}

export const useContactPage = () => {
    const [data, setData] = useState<ContactPageWithNested[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get('api/contactPage')
                const rawData = res.data
                const cleaned: ContactPageWithNested[] = Object.values(rawData)
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