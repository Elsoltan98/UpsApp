import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ModalScreen from "../screens/ModalScreen";
import OrderScressn from "../screens/OrderScreen";

export type RootStackParams = {
  Main: undefined;
  MyModal: { userId: string; name: string };
  Order: { order: Order };
};

const RootStack = createNativeStackNavigator<RootStackParams>();
const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="MyModal"
          options={{ headerShown: false }}
          component={ModalScreen}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen name="Order" component={OrderScressn} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
