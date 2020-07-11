import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Ball = () => {
  return <View style={styles.ball} />;
};

export default Ball;

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black"
  }
});
