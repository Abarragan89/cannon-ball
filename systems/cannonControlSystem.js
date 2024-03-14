// GLOBAL VARIABLES FOR MOVE CANNON CONTROL POSITIONS
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

// const leftArrowPos = {
//   // 80 = width, 80 = absolute right
//   leftX: width - (30 + 160),
//   // added 80 because that is the width
//   rightX: width - 160,
//   // height is about 40 and it is 10 from bottom
//   topY: height - 45,
//   bottomY: height - 17
// }

// const rightArrowPos = {
//   // 80 = width, 80 = absolute right
//   leftX: width - (80 + 80),
//   // added 80 because that is the width
//   rightX: width - (80 + 80) + 80,
//   // height is about 40 and it is 10 from bottom
//   topY: height - 45,
//   bottomY: height - 17
// }

let initialTouchX = null;

const cannonControlSystem = (entities, { touches }) => {

  // if (entities.cannon.isMoving) {
  //   entities.cannon.position[0] -= 1
  //   console.log('cannon positino[0]', entities.cannon.position[0])
  // }

  touches.forEach(t => {
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



    // LOGIC FOR TOUCH EVENTS FOR MOVING CANNON
    const { locationX, locationY } = t.event;

    //  THIS IS TRYING TO MOVE THE CANNON WITH A FLAG
    // if (
    //   locationX >= leftArrowPos.leftX &&
    //   locationX <= leftArrowPos.rightX &&
    //   locationY >= leftArrowPos.topY &&
    //   locationY <= leftArrowPos.bottomY
    // ) {
    //   if (t.type === 'start') {
    //     console.log('moving!!!')
    //     entities.cannon.isMoving = true;
    //   }
    //   else if (t.type === 'end') {
    //     console.log('out!')
    //     entities.cannon.isMoving = false;
    //   }
    // }

    if (
      locationX >= entities.cannon.position[0] &&
      locationX <= entities.cannon.position[0] + 40 &&
      locationY >= entities.cannon.position[1] &&
      locationY <= entities.cannon.position[1] + 80 
    ) {
      if (t.type === 'start') {
        console.log('Hey!')
        entities.cannon.position[0] = locationX
      }


      if (t.type === 'start') {
        initialTouchX = locationX;
      }

      // Update cannon's position during move event
      if (t.type === 'move' && initialTouchX !== null) {
        // Calculate horizontal movement distance
        const deltaX = locationX - initialTouchX;

        // Update cannon's position based on movement distance
        entities.cannon.position[0] += deltaX;

        // Update initial touch position for next move event
        initialTouchX = locationX;
      }

    }
  });

  return entities;
};

export default cannonControlSystem;
