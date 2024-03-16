// GLOBAL VARIABLES FOR MOVE CANNON CONTROL POSITIONS
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');

const cannonControlSystem = (entities, { touches }) => {

  touches.forEach(t => {
    // Control the POWER and the ANGLE
    if (t.type === "move") {
      let currentPower = entities.powerMeter.displayPower;
      let currentAngle = entities.angleMeter.angleLevel;
      const { locationX, locationY } = t.event;
      const deltaY = t.delta.pageY;
      const deltaX = t.delta.pageX;

      // LOGIC FOR TOUCH EVENTS FOR MOVING CANNON
      if (
        locationX >= entities.cannon.position[0] &&
        locationX <= entities.cannon.position[0] + 80 &&
        locationY >= entities.cannon.position[1] &&
        locationY <= entities.cannon.position[1] + 80
      ) {
        const currentPosition = entities.cannon.position[0]


        const deltaX = t.delta.pageX;
        // Interpolate power changes based on vertical movement
        const powerChange = deltaX * 1;
        entities.cannon.position[0] = Math.max(0, Math.min(width - 80, currentPosition + powerChange));
        //  I need to return so the rest of the code doesn't execute
        // I don't want to change the angle or power if I am moving the cannon launch
        return;
      }

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
