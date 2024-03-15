import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

export default function App() {
  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
