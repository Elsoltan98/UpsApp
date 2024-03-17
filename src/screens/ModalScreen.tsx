import { View, Text, TouchableOpacity } from "react-native";
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

  return (
    <View>
      <TouchableOpacity
        style={tw("absolute right-5 top-5 z-10")}
        onPress={() => navigation.goBack()}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View>
        <View>
          <Text>{name}</Text>
          <Text>deliveries</Text>
        </View>
      </View>
    </View>
  );
};

export default ModalScreen;
