import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";

const CustomersScreen = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView>
      <Text style={tailwind("text-blue-600")}>Customers Screen</Text>
    </SafeAreaView>
  );
};

export default CustomersScreen;
