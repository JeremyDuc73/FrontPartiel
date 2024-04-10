import {Button, FlatList, SafeAreaView, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {useEffect, useState} from "react";
import {CartItem} from "@/app/interfaces/CartItem";
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import {Link} from "expo-router";

export default function CartShow() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [total, setTotal] = useState(0)

    const getCart = async () => {
        return await axiosPrepared.get(Globals.baseUrl+"cart")
            .then((response)=> {
                console.log("cart fetch")
                setCartItems(response.data)
            })
    }

    async function getCartTotal() {
        await axiosPrepared.get(Globals.baseUrl+"cart/total")
            .then((response)=>{
                console.log(response.data)
                setTotal(response.data)
            })
    }

    async function removeOneFromCart(productId: number) {
        await axiosPrepared.post(Globals.baseUrl+"cart/remove/"+productId)
            .then((response)=>{
                console.log(response.data)
                getCart()
                getCartTotal()
            })
    }

    async function removeWholeFromCart(productId: number) {
        await axiosPrepared.post(Globals.baseUrl+"cart/removewhole/"+productId)
            .then((response)=>{
                console.log(response.data)
                getCart()
                getCartTotal()
            })
    }
    async function emptyCart() {
        await axiosPrepared.post(Globals.baseUrl+"cart/empty")
            .then((response)=>{
                console.log(response.data)
                getCart()
                setTotal(0)
            })
    }

    useEffect(()=>{
        getCart()
        getCartTotal()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={({item}: {item: CartItem; }) => (
                    <>
                        <View style={styles.card}>
                            <View>
                                <Text style={styles.itemText}>{item.product.name} x {item.quantity}</Text>
                                <Text>{item.product.price*item.quantity} € ({item.product.price} € par produit)</Text>
                            </View>

                            <View style={styles.buttonsDiv}>
                                <View><Button title={"Remove One"} onPress={() => removeOneFromCart(item.product.id)}/></View>
                                <View><Button title={"Remove Whole"} onPress={() => removeWholeFromCart(item.product.id)}/></View>
                            </View>
                        </View>
                    </>
                )}
            />
            <Text style={styles.total}>CART TOTAL : {total} €</Text>

            {total == 0 ? "" :
                <>
                    <View style={styles.button}>
                        <Button color="#d62020" title={"Empty Cart"} onPress={emptyCart}/>
                    </View>
                    <View style={styles.button}>
                        <Link href={"/order"} asChild>
                            <Button color="#4db85f" title={"Make Order"}/>
                        </Link>
                    </View>
                </>
            }

        </SafeAreaView>
    );
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
        fontSize: 20
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
    }
});
