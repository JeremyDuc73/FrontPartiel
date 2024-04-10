import {Button, Text, View, StyleSheet, SafeAreaView} from "react-native";
import {useRouter} from "expo-router";


export default function Home()
{
    const navigation = useRouter()

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <View>
                <View style={styles.button}>
                    <Button title="REGISTER" onPress={() => navigation.navigate('/register')}/>
                </View>
                <View style={styles.button}>
                    <Button title="LOGIN" onPress={() => navigation.navigate('/login')}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16
    },
    title : {
        fontSize: 30,
        textAlign: "center",
        textTransform: "uppercase"
    },
    button : {
        margin: 10
    }
})