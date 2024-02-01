import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;

const cannonControlSystem = (entities, { touches }) => {    
    touches.forEach(t => {
      let currentPower = entities.powerMeter.displayLevel;
      let currentAngle = entities.angleMeter.angleLevel

      // Make sure that the angle doesn't change if you are moving slider
      let isTouchAboveSlider = t.event.pageY < screenHeight - 100;
      
      if (t.type === "move") {
        // decrease power
        if (t.delta.pageY > 5  && currentPower > 0) {
          entities.powerMeter.powerLevel -= .5
          entities.powerMeter.displayLevel -= 1
        }
        // increase power 
        if (t.delta.pageY < -5 && currentPower < 100) {
          entities.powerMeter.powerLevel += .5
          entities.powerMeter.displayLevel += 1
        }
        // decrease angle
        if (t.delta.pageX > 5 && currentAngle > 0 && isTouchAboveSlider) {
          entities.angleMeter.angleLevel -= 1
          entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`
        }
        // increase angle
        if (t.delta.pageX < -5 && currentAngle < 180 && isTouchAboveSlider) {
          entities.angleMeter.angleLevel += 1
          entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`
        }
      }
    });
    return entities;
  };
  
  export default cannonControlSystem ;