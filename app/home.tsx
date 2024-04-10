import {Button, Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {Link} from "expo-router";

export default function Home() {
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.button}>
              <Link
                  href="/scanner" asChild>
                  <Button title="SCANNER"/>
              </Link>
          </View>
          <View style={styles.button}>
              <Link href="/cartShow" asChild>
                  <Button title="CART"/>
              </Link>
          </View>
          <View style={styles.button}>
              <Link href="/myorders" asChild>
                  <Button title="ORDERS"/>
              </Link>
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16
  },
    button: {
      marginBottom: 20
    }
});
