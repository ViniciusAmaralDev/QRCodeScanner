import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) =>
    console.log(data.split(";").split(":"));

  return (
    <>
      {hasPermission && (
        <BarCodeScanner
          type="back"
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#54F",
  },
  scannerContainer: {
    width: width,
    height: height,
  },
  button2: {
    position: "absolute",
    top: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
    backgroundColor: "#54F",
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
    backgroundColor: "#54F",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});
