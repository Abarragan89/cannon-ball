// GLOBAL VARIABLES FOR MOVE CANNON CONTROL POSITIONS
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');

const cannonControlSystem = (entities, { touches }) => {
  touches.forEach(t => {
    if (t.type === "move") {
      const { locationX, locationY } = t.event;
      const deltaY = t.delta.pageY;
      const deltaX = t.delta.pageX;
      
      // LOGIC FOR FOR MOVING CANNON LAUNCH
      if (
        locationX >= entities.cannon.position[0] &&
        locationX <= entities.cannon.position[0] + 80 &&
        locationY >= entities.cannon.position[1] &&
        locationY <= entities.cannon.position[1] + 80
        ) {
          // Check if it is inbounds to move more or less
          const currentPosition = entities.cannon.position[0]
          const deltaX = t.delta.pageX;
          // Interpolate power changes based on vertical movement
          const movementChange = deltaX * 1;
          console.log('movement change ', movementChange)
          // Check for travel limits on certain maps
          const lowerLimit = entities.cannon.lowerTravelLimit ;
          const upperLimit = entities.cannon.upperTravelLimit;
          if (movementChange < 0 && lowerLimit && entities.cannon.position[0] < lowerLimit) {
            return;
          }
          if (movementChange > 0 && upperLimit && entities.cannon.position[0] > upperLimit) {
            return;
          }
          // Move the Cannon if it passes travel limits
          entities.cannon.position[0] = Math.max(0, Math.min(width - 80, currentPosition + movementChange));
          //  I need to return so the rest of the code doesn't execute
          // I don't want to change the angle or power if I am moving the cannon launch
          return;
        }
        
        // Control the POWER and the ANGLE
        let currentPower = entities.powerMeter.displayPower;
        let currentAngle = entities.angleMeter.angleLevel;
        const angleSensitivity = 0.08;
        const powerSensitiviy = 0.05
        
        // Interpolate power changes based on vertical movement
        const powerChange = -deltaY * powerSensitiviy;
        entities.powerMeter.displayPower = Math.max(0, Math.min(75, currentPower + powerChange));
        
        // Interpolate angle changes based on horizontal movement
      const angleChange = -deltaX * angleSensitivity;
      entities.angleMeter.angleLevel = Math.max(0, Math.min(180, currentAngle + angleChange));

      // Rotate the cannon visually
      entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`;
    }

  });

  return entities;
};

export default cannonControlSystem;
