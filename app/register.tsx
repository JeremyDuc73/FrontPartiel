import {useState} from "react";
import {useRouter} from "expo-router";
import axios from "axios";
import {Button, SafeAreaView, StyleSheet, TextInput} from "react-native";


export default function Register()
{
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useRouter()

    async function register() {
        const user = {email, password}
        await axios.post("https://partielS2.jeremyduc.com/register", user)
            .then((response)=> {
                console.log(response.data)
            })
        navigation.replace('/login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                value={email}
                style={styles.input}
                placeholder="email"
                autoCapitalize="none"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                value={password}
                secureTextEntry
                style={styles.input}
                placeholder="password"
                autoCapitalize="none"
                onChangeText={text => setPassword(text)}
            />
            <Button title="REGISTER" onPress={register}/>
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