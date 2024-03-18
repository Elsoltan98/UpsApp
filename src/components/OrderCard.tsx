import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Card, Icon } from "@rneui/themed";
import { ColorPalete } from "../themes";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { OrderScreenNavigationProp } from "../screens/OrdersScreen";

type OrderCardProps = {
  item: Order;
};

const OrderCard: FC<OrderCardProps> = ({ item }) => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const tw = useTailwind();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Order", { order: item })}
    >
      <Card containerStyle={tw("px-5 rounded-lg")}>
        <View style={tw("flex-row justify-between items-center")}>
          <View>
            <Icon
              name="truck-delivery"
              color={ColorPalete.pink}
              type="material-community"
            />
            <Text style={{ fontSize: 10 }}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>

          <View>
            <Text style={[tw("text-gray-400"), { fontSize: 10 }]}>
              {item.carrier} - {item.trackingId}
            </Text>
            <Text style={tw("text-gray-400 text-xl")}>
              {item.trackingItems.customer.name}
            </Text>
          </View>

          <View style={tw("flex-row items-center")}>
            <Text style={[tw("text-sm"), { color: ColorPalete.pink }]}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon name="box" type="feather" style={tw("ml-2")} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
