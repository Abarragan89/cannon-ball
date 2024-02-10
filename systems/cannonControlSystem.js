import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;

const cannonControlSystem = (entities, { touches }) => {    
    touches.forEach(t => {
      let currentPower = entities.gameData.displayPowerLevel.current;
      let currentAngle = entities.gameData.angleLevel.current;
``
      // Make sure that the angle doesn't change if you are moving slider
      let isTouchAboveSlider = t.event.pageY < screenHeight - 100;
      
      if (t.type === "move") {
        // decrease power
        console.log('current power ', currentPower)
        if (t.delta.pageY > 5  && currentPower > 0) {
          // set the ref for entity render
          entities.gameData.displayPowerLevel.current -= 1
          // set state for component render
          entities.gameData.setDisplayPowerLevel(entities.gameData.displayPowerLevel.current);
          // set actual power 
          entities.gameData.powerLevel -= .5
        }
        // increase power 
        if (t.delta.pageY < -5 && currentPower < 100) {
          // set the ref for entity render
          entities.gameData.displayPowerLevel.current += 1
          // set state for component render
          entities.gameData.setDisplayPowerLevel(entities.gameData.displayPowerLevel.current)
          // set actual power
          entities.gameData.powerLevel += .5

        }
        // decrease angle
        if (t.delta.pageX > 5 && currentAngle > 0 && isTouchAboveSlider) {
          // update ref in order for UI (cannonLauncher) to update view
          entities.gameData.angleLevel.current -= 1;
          // update state in order for UI (meter) to update
          entities.gameData.setAngleLevel(entities.gameData.angleLevel.current)
          // update view for cannon
          entities.cannon.rotate = `-${entities.gameData.angleLevel.current}deg`
        }
        // increase angle
        if (t.delta.pageX < -5 && currentAngle < 180 && isTouchAboveSlider) {
          entities.gameData.angleLevel.current += 1;
          entities.gameData.setAngleLevel(entities.gameData.angleLevel.current);
          
          entities.cannon.rotate = `-${entities.gameData.angleLevel.current}deg`
        }
      }
    });
    return entities;
  };
  
  export default cannonControlSystem ;