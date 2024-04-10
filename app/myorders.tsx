import {useEffect, useState} from "react";
import {Order} from "@/app/interfaces/Order";
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import {Button, FlatList} from "react-native";
import {Text, View} from "@/components/Themed";
import {Link} from "expo-router";
import {OrderItem} from "@/app/interfaces/OrderItem";

export default function MyOrders()
{
    const [orders, setOrders] = useState<Order[]>([])

    const getMyOrders = async () => {
        return await axiosPrepared.get(Globals.baseUrl+"myorders")
            .then((response)=> {
                console.log("orders fetched")
                console.log(response.data)
                setOrders(response.data)
            })
    }

    useEffect(()=>{
        getMyOrders()
    }, [])

    return (
        <>
            <FlatList
                data={orders}
                renderItem={({item}: {item: Order; }) => (
                    <>
                        <FlatList
                            data={item.orderItems}
                            renderItem={({item}: {item: OrderItem})=>(
                                <View>
                                    <Text>{item.product.name} * {item.quantity}</Text>
                                </View>
                            )}
                        />
                        <Text>{item.total}€</Text>
                    </>
                )}
            />
        </>
    )
}