import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import { BarCodeScanner } from "expo-barcode-scanner";
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [result, setResult] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        console.log(error);
      }
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setResult(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#fff",
          width: width / 1.2,
          height: height / 2,
        }}
      >
        <BarCodeScanner
          BarCodeScannedCallbajck={(e) => {
            alert(e);
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <Text
        style={{
          color: "#fff",
          width: width,
          fontSize: 24,
          textAlign: "center",
          height: height / 30,
        }}
        selectable
      >
        {scanned && result}
      </Text>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => setScanned(false)}
      >
        <Text style={styles.fontStyle}>Scan Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
    // backgroundColor: "#fff",
    backgroundColor: "#125386",
    width: width / 2,
    borderRadius: 10,
    justifyContent: "center",
    height: height / 12,
  },
  fontStyle: { fontSize: 20, fontWeight: "700", color: "#f4fafe" },
  container: {
    paddingVertical: height / 9,
    flex: 1,
    backgroundColor: "#040f47",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
