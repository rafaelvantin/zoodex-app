import React from "react";

import { View, Text, Image } from "react-native";

export default function Maps() {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri:
            "https://viajento.files.wordpress.com/2019/05/houston-zoo-estados-unidos-mapa.jpg?w=840",
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
