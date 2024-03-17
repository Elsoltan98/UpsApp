import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamsList } from "../navigation/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootNavigator";
import { useTailwind } from "tailwind-rn";
import useOrders from "../../hooks/useOrders";
import { ColorPalete } from "../themes";
import { Button, Image } from "@rneui/themed";
import OrderCard from "../components/OrderCard";

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Orders">,
  NativeStackNavigationProp<RootStackParams>
>;

const OrdersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text
          style={{ color: focused ? ColorPalete.pink : color, fontSize: 10 }}
        >
          Orders
        </Text>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View>
        <Button
          color="pink"
          titleStyle={{ color: ColorPalete.secondery, fontWeight: "400" }}
          style={tw("py-2 px-5")}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
        </Button>

        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalete.pink,
    flex: 1,
  },
});

export default OrdersScreen;
