import {useState} from "react";
import {useRouter} from "expo-router";
import axios from "axios";
import {Button, TextInput} from "react-native";


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
        <>
            <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                value={password}
                secureTextEntry
                onChangeText={text => setPassword(text)}
            />
            <Button title="REGISTER" onPress={register}/>
        </>
    )
}