import {Link, useLocalSearchParams} from "expo-router";
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View, StyleSheet, TextInput, Button, SafeAreaView} from "react-native";
import {Product} from "@/app/interfaces/Product";

export default function ProductName()
{
    const {productName} = useLocalSearchParams()

    const [product, setProduct] = useState<Product>()
    const [counter, setCounter] = useState(1);
    const [initialCount, setInitialCount] = useState(1);
    const [returnedId, setReturnedId] = useState(0)


    const handleInitialCountChange = (value: any) => {
        setInitialCount(Number(value));
    };

    const handleReset = () => {
        setCounter(initialCount);
    };

    const getProduct = async () => {
        return await axiosPrepared.get(Globals.baseUrl+"product/"+productName)
            .then((response)=>{
                console.log("product fetched")
                setProduct(response.data)
                setReturnedId(response.data.id)
                console.log(response.data)
            })
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.productName}>{product?.name}</Text>
            <Text style={styles.productPrice}>{product?.price} €</Text>
            {product?.image == null?
                <Image
                    source={{uri: 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'}}
                    style={{width: 200, height: 200}}
                />
                 :
                <Image
                    source={{uri: `https://partiels2.jeremyduc.com/images/${product?.image.imageName}`}}
                    style={{width: 200, height: 200}}
                />
            }


            <Text style={styles.counterText}>Quantity to add : {counter}</Text>
            <View>
                <TextInput
                    style={styles.inputCounter}
                    keyboardType="numeric"
                    placeholder="Change quantity here"
                    onChangeText={handleInitialCountChange}
                />
                <View style={styles.button}>
                    <Button title={"Set quantity"} onPress={handleReset}/>
                </View>
            </View>
            <View>
                <Link
                    href={{
                        pathname: "/cart/[addToCart]",
                        params: { addToCart: returnedId, quantity: counter}
                    }}
                    asChild
                >
                    <Button title={"Add to cart"}/>
                </Link>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        marginHorizontal: 16
    },
    productName: {
        fontSize: 30,
        textTransform: "capitalize"
    },
    productPrice: {
        fontSize: 20,
        marginBottom: 10
    },
    counterText: {
        fontSize: 25,
        marginTop: 10
    },
    inputCounter: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 30,
        marginTop: 20
    },
    button: {
        marginBottom: 20
    }

});