import React from "react";
import { StyleSheet, Animated, View, PanResponder } from "react-native";

const Deck = ({ data, renderCard }) => {
  const position = new Animated.ValueXY(0, 0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      console.log(gesture);
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: () => {}
  });

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-500, 0, 500],
      outputRange: ["-180deg", "0deg", "180deg"]
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  const renderCards = () => {
    return data.map((x, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={x.id}
            style={getCardStyle()}
            {...panResponder.panHandlers}
          >
            {renderCard(x)}
          </Animated.View>
        );
      }
      return renderCard(x);
    });
  };

  return <View>{renderCards()}</View>;
};

export default Deck;

const styles = StyleSheet.create({});
