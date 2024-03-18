import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../navigation/RootNavigator";
import { useTailwind } from "tailwind-rn";
import { OrderScreenNavigationProp } from "./OrdersScreen";
import { ColorPalete } from "../themes";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenRouting = RouteProp<RootStackParams, "Order">;

const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouting>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: ColorPalete.pink,
      headerTitleStyle: { color: "black" },
      headerBackTitle: "Deliveries",
    });
  }, []);
  return (
    <View style={tw("mt-2")}>
      <DeliveryCard fullWidth order={order} />
    </View>
  );
};

export default OrderScreen;
