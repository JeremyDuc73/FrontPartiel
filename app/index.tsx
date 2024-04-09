import {Button, Text, View, StyleSheet} from "react-native";
import {useRouter} from "expo-router";


export default function Home()
{
    const navigation = useRouter()

    return (
        <>
            <Text style={styles.title}>Welcome</Text>
            <View>
                <Button title="REGISTER" onPress={() => navigation.navigate('/register')}/>
                <Button title="LOGIN"/>
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    title : {
        color: 'white'
    }
})