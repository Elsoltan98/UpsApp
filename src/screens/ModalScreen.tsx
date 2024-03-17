import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamsList } from "../navigation/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootNavigator";
import { useTailwind } from "tailwind-rn";
import { Icon } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../graphql/quieries";
import useCustomerOrders from "../../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";
import { ColorPalete } from "../themes";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList>,
  NativeStackNavigationProp<RootStackParams, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParams, "MyModal">;

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const tw = useTailwind();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();
  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View style={{ paddingBottom: 150 }}>
      <TouchableOpacity
        style={tw("absolute right-5 top-5 z-10")}
        onPress={() => navigation.goBack()}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <View
          style={[tw("py-5 border-b"), { borderColor: ColorPalete.primary }]}
        >
          <Text
            style={[
              tw("text-center text-xl font-bold"),
              { color: ColorPalete.primary },
            ]}
          >
            {name}
          </Text>
          <Text style={[tw("text-center italic text-sm")]}>deliveries</Text>
        </View>
      </View>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(order) => order.trackingId}
          renderItem={({ item: order }) => <DeliveryCard order={order} />}
          ListFooterComponentStyle={{ marginBottom: 50 }}
        />
      ) : (
        <Text style={[tw("text-center font-bold text-sm")]}>
          No Orders yet !!!
        </Text>
      )}
    </View>
  );
};

export default ModalScreen;
