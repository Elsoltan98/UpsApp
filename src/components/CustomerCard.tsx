import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import useCustomerOrders from "../../hooks/useCustomerOrders";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { CustomersScreenNavigationProp } from "../screens/CustomersScreen";
import { Card, Icon } from "@rneui/themed";
import { ColorPalete } from "../themes";

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard: FC<Props> = ({ userId, name, email }) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  return (
    <TouchableOpacity>
      <Card containerStyle={tw("p-5 rounded-lg")}>
        <View>
          <Text>{name}</Text>
          <Text>ID: {userId}</Text>
        </View>
        <View>
          <Text>{loading ? "Loading..." : `${orders.length}`}</Text>
          <Icon
            style={tw("mb-5 ml-auto")}
            name="box"
            type="entypo"
            color={ColorPalete.primary}
            size={50}
          />
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
