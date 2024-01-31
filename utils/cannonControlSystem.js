const cannonControlSystem = (entities, { touches }) => {    
    touches.forEach(t => {
      let currentPower = entities.powerMeter.displayLevel;
      let currentAngle = entities.angleMeter.angleLevel
      
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
        if (t.delta.pageX > 5 && currentAngle > 0) {
          entities.angleMeter.angleLevel -= 1
          entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`
        }
        // increase angle
        if (t.delta.pageX < -5 && currentAngle < 180) {
          entities.angleMeter.angleLevel += 1
          entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`
        }
      }
    });
    return entities;
  };
  
  export default cannonControlSystem ;