import {useEffect, useState} from "react";
import {Order} from "@/app/interfaces/Order";
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import {Button, FlatList, SafeAreaView, StyleSheet} from "react-native";
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

    const Separator = () => <View style={styles.separator} />;


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={orders}
                renderItem={({item}: {item: Order; }) => (
                    <View style={styles.card}>
                        <FlatList
                            data={item.orderItems}
                            renderItem={({item}: {item: OrderItem})=>(
                                <View>
                                    <Text style={styles.itemText}>{item.product.name}({item.product.price}€) x {item.quantity} = {item.product.price*item.quantity} €</Text>
                                    <Separator/>
                                </View>
                            )}
                        />
                        <Text>TOTAL : {item.total}€</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16
    },
    card: {
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10
    },
    itemText: {
        fontSize: 15
    },
    buttonsDiv: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-around"
    },
    total: {
        fontSize: 17,
        textAlign: "center",
        marginBottom: 15,
        borderWidth: 0.5,
        padding: 5,
        fontWeight: "bold"
    },
    button: {
        marginBottom: 20
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
