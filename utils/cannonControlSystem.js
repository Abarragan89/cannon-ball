const cannonControlSystem = (entities, { touches }) => {    
    touches.forEach(t => {
      let currentPower = entities.powerMeter.displayLevel;
      let currentAngle = entities.angleMeter.angleLevel
      
      if (t.type === "move") {
        // increase power
        if (t.delta.pageX > 10  && currentPower < 100) {
          entities.powerMeter.powerLevel += .5
          entities.powerMeter.displayLevel += 1
        }
        // decrease power 
        if (t.delta.pageX < -10 && currentPower > 1) {
          entities.powerMeter.powerLevel -= .5
          entities.powerMeter.displayLevel -= 1
        }
        // increase angle
        if (t.delta.pageY > 10 && currentAngle > 0) {
          console.log('hey ther in decrease')
          entities.angleMeter.angleLevel -= 1
        }
        // decrease angle
        if (t.delta.pageY < -10 && currentAngle < 90) {
          entities.angleMeter.angleLevel += 1
        }
      }
    });
    return entities;
  };
  
  export default cannonControlSystem ;


  // Make two entities for the sliders
  // one responds to the left and the other the righton