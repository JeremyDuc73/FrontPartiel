import {useLocalSearchParams, useRouter} from "expo-router";
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import {useEffect} from "react";

export default function AddToCart()
{
    const {productId, quantity} = useLocalSearchParams()

    const addToCart = async () => {
        return await axiosPrepared.post(Globals.baseUrl+"cart/add/"+productId+"/"+quantity)
            .then((response)=>{
                console.log("product added")

            })
    }

    useRouter().navigate('../scanner')

    useEffect(() => {
        addToCart()

    }, [])
}
