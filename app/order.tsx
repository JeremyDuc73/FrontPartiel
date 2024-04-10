import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import {useRouter} from "expo-router";
import {useEffect} from "react";

export default function Order()
{
    const makeOrder = async () => {
        return await axiosPrepared.post(Globals.baseUrl+"makeorder")
            .then((response)=>{
                console.log("response.data")
            })
    }

    useRouter().navigate('/home')

    useEffect(() => {
        makeOrder()
    }, [])
}