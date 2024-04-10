import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {Camera} from "expo-camera";
import {CameraView} from "expo-camera/next";
import {Link, useRouter} from "expo-router";
import {setParams} from "expo-router/build/global-state/routing";


export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productName, setProductName] = useState("")

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      // @ts-ignore
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // @ts-ignore
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setProductName(data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.container}>
        <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
            <SafeAreaView>
              <View style={styles.button}>
                <Link
                    href={{
                      pathname: "/product/[productName]",
                      params: { productName: productName }
                    }}
                    asChild
                >
                  <Button title={`SEE PRODUCT "${productName}"`} onPress={() => setScanned(false)}/>
                </Link>
              </View>
              <View style={styles.button}><Button title={"Tap to Scan Again"} onPress={() => setScanned(false)}/></View>
            </SafeAreaView>
        )}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    marginHorizontal: 16
  }
});
