import React from "react";
import {
  StyleSheet,
  Animated,
  View,
  PanResponder,
  Dimensions
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({ data, renderCard }) => {
  const position = new Animated.ValueXY(0, 0);

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start();
  };

  const forceSwipe = direction => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: {
        x,
        y: 0
      },
      duration: SWIPE_OUT_DURATION
    }).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        console.log("swipe right");
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        console.log("swipe left");
        forceSwipe("left");
      } else {
        resetPosition();
      }
    }
  });

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
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
