import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;

const cannonControlSystem = (entities, { touches }) => {    
    touches.forEach(t => {
      let currentPower = entities.cannonControls.displayPowerLevel.current;
      let currentAngle = entities.cannonControls.angleLevel.current;

      // Make sure that the angle doesn't change if you are moving slider
      let isTouchAboveSlider = t.event.pageY < screenHeight - 100;
      
      if (t.type === "move") {
        // decrease power
        if (t.delta.pageY > 5  && currentPower > 0) {
          // entities.cannonControls.displayLevel -= 1
          entities.cannonControls.displayPowerLevel.current -= 1;
          entities.cannonControls.setDisplayPowerLevel(entities.cannonControls.displayPowerLevel.current)
          
          entities.cannonControls.powerLevel -= .5
        }
        // increase power 
        if (t.delta.pageY < -5 && currentPower < 100) {
          // entities.cannonControls.displayLevel += 1
          entities.cannonControls.displayPowerLevel.current += 1;
          entities.cannonControls.setDisplayPowerLevel(entities.cannonControls.displayPowerLevel.current)

          entities.cannonControls.powerLevel += .5
        }
        // decrease angle
        if (t.delta.pageX > 5 && currentAngle > 0 && isTouchAboveSlider) {
          // update ref in order for UI (cannonLauncher) to update view
          entities.cannonControls.angleLevel.current -= 1;
          // update state in order for UI (meter) to update
          entities.cannonControls.setAngleLevel(entities.cannonControls.angleLevel.current)
          // update view for cannon
          entities.cannon.rotate = `-${entities.cannonControls.angleLevel.current}deg`
        }
        // increase angle
        if (t.delta.pageX < -5 && currentAngle < 180 && isTouchAboveSlider) {
          entities.cannonControls.angleLevel.current += 1;
          entities.cannonControls.setAngleLevel(entities.cannonControls.angleLevel.current);
          
          entities.cannon.rotate = `-${entities.cannonControls.angleLevel.current}deg`
        }
      }
    });
    return entities;
  };
  
  export default cannonControlSystem ;