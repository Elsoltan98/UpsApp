import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamsList } from "../navigation/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootNavigator";
import { Image } from "@rneui/themed";
import { ColorPalete } from "../themes";

export type CustomersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Customers">,
  NativeStackNavigationProp<RootStackParams>
>;

const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: ColorPalete.primary },
});

export default CustomersScreen;
