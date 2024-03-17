import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Card, Divider, Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn";
import { ColorPalete } from "../themes";
import MapView, { Marker } from "react-native-maps";

type DeliveryCardProps = {
  order: Order;
};

const DeliveryCard: FC<DeliveryCardProps> = ({ order }) => {
  const tw = useTailwind();
  return (
    <Card containerStyle={[tw("rounded-lg my-2"), styles.container]}>
      <View>
        <Icon name="box" type="entypo" size={50} color={ColorPalete.white} />
        <View>
          <Text
            style={tw("text-xs text-center uppercase text-white font-bold")}
          >
            {order.carrier} - {order.trackingId}
          </Text>
          <Text
            style={tw("text-lg text-center uppercase text-white font-bold")}
          >
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color={ColorPalete.white} />
        </View>

        <View style={tw("mx-auto pb-1")}>
          <Text style={tw("text-base text-center text-white font-bold mt-5")}>
            Address
          </Text>
          <Text style={tw("text-sm text-center text-white")}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tw("text-sm text-center italic text-white")}>
            Shipping Cost: €{order.shippingCost}
          </Text>
        </View>
        <Divider />

        <View style={tw("p-5")}>
          {order.trackingItems.items.map((item) => (
            <View
              key={item.item_id}
              style={tw("flex-row justify-between items-center")}
            >
              <Text style={tw("text-sm italic text-white")}>{item.name}</Text>
              <Text style={tw("text-xl text-white")}>x {item.quantity}</Text>
            </View>
          ))}
        </View>
      </View>

      <MapView
        initialRegion={{
          latitude: order.Lat,
          longitude: order.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={[tw("w-full"), { height: 200 }]}
      >
        <Marker
          coordinate={{ latitude: order.Lat, longitude: order.Lng }}
          title="Delivery Location"
          description={order.Address}
          identifier="destination"
        />
      </MapView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalete.primary,
    padding: 0,
    paddingTop: 16,
    shadowColor: ColorPalete.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default DeliveryCard;
