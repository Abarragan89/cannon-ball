import React, { useRef } from 'react';
import { View, PanResponder } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const PowerAngleControl = ({ setDisplayPowerLevel, displayPowerLevel, angleLevel, setAngleLevel, powerLevel }) => {

    const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
    //     console.log('hey from pan ', gestureState)
    //     const deltaY = gestureState.dy;
    //     const deltaX = gestureState.dx;

    //      // Define the sensitivity factor for interpolation
    //   const angleSensitivity = 0.008;
    //   const powerSensitiviy = 0.005
      
    //   // Interpolate power changes based on vertical movement
    //   const powerChange = -deltaY * angleSensitivity;
    //   displayPowerLevel.current = Math.max(0, Math.min(75, displayPowerLevel.current + powerChange));
    //   setDisplayPowerLevel(displayPowerLevel.current);
    //   powerLevel.current = Math.max(0, Math.min(75, powerLevel.current + powerChange));

    //   // Interpolate angle changes based on horizontal movement
    //   const angleChange = -deltaX * powerSensitiviy;
    //   angleLevel.current = Math.max(0, Math.min(180, angleLevel.current + angleChange));
    //   setAngleLevel(angleLevel.current);
      entities.cannon.rotate = `-${entities.gameData.angleLevel.current}deg`;
      },
    })
  ).current;

  return (
    <View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0, 
        right: 0,
    }} {...panResponder.panHandlers}>
      {/* Your component content goes here */}
    </View>
  );
};

export default PowerAngleControl;