// helper function to update rotate tranform (angle) of the Cannon image.


const cannonControlSystem = (entities, { touches }) => {    
    touches.forEach(t => {
      let currentPower = entities.powerMeter.displayLevel;
      let currentAngle = entities.angleMeter.angleLevel
      
      if (t.type === "move") {
        // increase power
        if (t.delta.pageX > 5  && currentPower < 100) {
          entities.powerMeter.powerLevel += .5
          entities.powerMeter.displayLevel += 1
        }
        // decrease power 
        if (t.delta.pageX < -5 && currentPower > 1) {
          entities.powerMeter.powerLevel -= .5
          entities.powerMeter.displayLevel -= 1
        }
        // increase angle
        if (t.delta.pageY > 5 && currentAngle > 0) {
          entities.angleMeter.angleLevel -= 1
          entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`
        }
        // decrease angle
        if (t.delta.pageY < -5 && currentAngle < 180) {
          entities.angleMeter.angleLevel += 1
          entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`
        }
      }
    });
    return entities;
  };
  
  export default cannonControlSystem ;


  // Make two entities for the sliders
  // one responds to the left and the other the righton