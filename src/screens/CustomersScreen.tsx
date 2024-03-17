import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamsList } from "../navigation/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { ColorPalete } from "../themes";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../../graphql/quieries";
import CustomerCard from "../components/CustomerCard";

export type CustomersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Customers">,
  NativeStackNavigationProp<RootStackParams>
>;

const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  const [input, setInput] = useState("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        value={input}
        onChangeText={setInput}
        placeholder="Search by customer"
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />

      <ScrollView style={styles.dataContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={ColorPalete.white} />
        ) : (
          data?.getCustomers
            .filter((customer: CustomerList) =>
              customer.value.name.includes(input)
            )
            .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
              <CustomerCard key={ID} email={email} name={name} userId={ID} />
            ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalete.primary,
    flex: 1,
  },
  dataContainer: {
    marginBottom: 20,
    backgroundColor: ColorPalete.primary,
  },
});

export default CustomersScreen;
