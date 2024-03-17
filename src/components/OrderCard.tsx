import { View, Text } from "react-native";
import React, { FC } from "react";

type OrderCardProps = {
  item: Order;
};

const OrderCard: FC<OrderCardProps> = ({ item }) => {
  return (
    <View>
      <Text>OrderCard</Text>
    </View>
  );
};

export default OrderCard;
