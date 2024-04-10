import {useState} from "react";
import {useRouter} from "expo-router";
import {Globals} from "@/app/common/globals";
import axios from "axios";
import axiosPrepared from "@/app/auth/interceptor";
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from "react-native";


export default function Login()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useRouter()

    async function login(){
        const user = {email, password}
        await axios.post(Globals.baseUrl+'login_check', user)
            .then((response)=>{
                Globals.token = response.data.token
            })
        await axiosPrepared.get(Globals.baseUrl+'profile')
            .then((response:any)=>{
                Globals.actualUser = {
                    id: response.data.id,
                    email: response.data.ofUser.email
                }
                console.log(Globals.actualUser)
            })
        navigation.navigate('/home')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                value={email}
                placeholder="email"
                autoCapitalize="none"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={text => setPassword(text)}
            />
            <Button title="LOGIN" onPress={login}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16
    },
    input : {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 30
    }
})