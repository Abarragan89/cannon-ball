// GLOBAL VARIABLES FOR MOVE CANNON CONTROL POSITIONS
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')

const buttonPosition = {
  left: {
    bottom: 10, // Adjust these values based on your button's actual position and size
    right: 50,
    width: 100,
    height: 20,
  },
  // right: {
  //   bottom: 150, // Adjust these values based on your button's actual position and size
  //   right: 450,
  //   width: 100,
  //   height: 50,
  // }const buttonLeft = buttonPosition.right - buttonPosition.width;
}

const leftArrowBtnPos = {
  // 200 = width, 50 = absolute right
  leftX: width - (200 + 50),
  // added 40 because that is the width
  rightX: width - (200 + 50) + 40, 
  // height is about 40 and it is 10 from bottom
  topY: height - 50,
  bottomY: height - 10
}

const buttonLeft = width - (buttonPosition.left.right + 200);
const buttonTop = height - buttonPosition.left.bottom - 20;
console.log('button top ', buttonTop)
console.log('button left ', buttonLeft)

const cannonControlSystem = (entities, { touches }) => {

  touches.forEach(t => {
    // Control the position of the cannon
    console.log('location X ', t.event.locationX)
    console.log('location Y ', t.event.locationY)
    const { locationX, locationY } = t.event
    if (
      locationX >= leftArrowBtnPos.leftX &&
      locationX <= leftArrowBtnPos.rightX &&
      locationY >= leftArrowBtnPos.topY &&
      locationY <= leftArrowBtnPos.bottomY
    ) {
      // The button has been pressed
      console.log('left button pressed')
     entities.cannon.position[0] -= 1
    }

    // Control the POWER and the ANGLE
    let currentPower = entities.powerMeter.displayPower;
    let currentAngle = entities.angleMeter.angleLevel;
    if (t.type === "move") {
      const deltaY = t.delta.pageY;
      const deltaX = t.delta.pageX;

      // Define the sensitivity factor for interpolation
      const angleSensitivity = 0.08;
      const powerSensitiviy = 0.05

      // Interpolate power changes based on vertical movement
      const powerChange = -deltaY * angleSensitivity;
      entities.powerMeter.displayPower = Math.max(0, Math.min(75, currentPower + powerChange));

      // Interpolate angle changes based on horizontal movement
      const angleChange = -deltaX * powerSensitiviy;
      entities.angleMeter.angleLevel = Math.max(0, Math.min(180, currentAngle + angleChange));

      // Rotate the cannon visually
      entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`;
    }
  });

  return entities;
};

export default cannonControlSystem;
