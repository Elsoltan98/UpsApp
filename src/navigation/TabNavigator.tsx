import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomersScreen from "../screens/CustomersScreen";
import OrdersScreen from "../screens/OrdersScreen";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { ColorPalete } from "../themes";

export type TabStackParamsList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamsList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: ColorPalete.primary,
        tabBarInactiveTintColor: ColorPalete.secondery,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Customers") {
            return (
              <Icon
                name="users"
                type="entypo"
                color={focused ? ColorPalete.primary : ColorPalete.secondery}
              />
            );
          } else if (route.name === "Orders") {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? ColorPalete.primary : ColorPalete.secondery}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
