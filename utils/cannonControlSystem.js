// class CannonBallBasic {
//   constructor(ballEntity, posX, posY) {
//     this.ball = ballEntity;
//     this.posX = posX;
//     this.posY = posY;
//     // this.VY = VY;
//     // this.VX = VX;
//     // this.color = color;
//   }

//   move() {
//     this.ball.posX += 10
//   }

// }

const cannonControlSystem = (entities, { touches }) => {
    // const cannonBall = new CannonBallBasic(entities[1], entities[1].position[0], entities[1].position[1])
    
    touches.forEach(t => {
      let currentPower = entities.powerMeter.powerLevel;
      
      if (t.type === "move") {
        if (t.delta.pageX > 5  && currentPower < 100) {
          console.log('first')
          entities.powerMeter.powerLevel += 1
        }
        if (t.delta.pageX < -5 && currentPower > 0) {
          console.log(t.delta.pageX)
          console.log('second')
          entities.powerMeter.powerLevel -= 1
        }

        if (t.delta.pageY > 10) {
          console.log('third', t.delta.pageY )
          entities.cannonBall.position[1] += 3;
        }
        if (t.delta.pageY < -10) {
          console.log('fourth', t.delta.pageY )
          entities.cannonBall.position[1] -= 3
        }
      }
    });
    return entities;
  };
  
  export default cannonControlSystem ;


  // Make two entities for the sliders
  // one responds to the left and the other the righton