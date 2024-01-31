import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let isBallMoving = false;
export let animationFrameId;

const fireCannonSystem = (entities, { touches }) => {
  touches.forEach(t => {

    if (t.type === "long-press") {
      if (isBallMoving) {
        cancelAnimationFrame(animationFrameId)
      }
      isBallMoving = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      // set initial coordinates to be where the cannon tip is located
      entities.cannonBall.position[0] = entities.cannon.position[0] + 25;
      entities.cannonBall.position[1] = entities.cannon.position[1] + 15;

      const GRAVITY = .05
      let ANGLE = entities.angleMeter.angleLevel;
      let POWER = entities.powerMeter.powerLevel

      // Create the velocity for X and Y that create the arc.
      const angleInRadians = (ANGLE * Math.PI) / 180;
      entities.cannonBall.velocity[0] = POWER * Math.cos(angleInRadians) * 0.2;
      entities.cannonBall.velocity[1] = -POWER * Math.sin(angleInRadians) * 0.2




      const animateMovement = () => {
        if (isBallMoving) {
          // Update the X and Y based on the arc velocity
          entities.cannonBall.position[0] += entities.cannonBall.velocity[0]
          entities.cannonBall.position[1] += entities.cannonBall.velocity[1]

          // update the position fo the explosion of the cannon ball
          // entities.explosion.ballPosition[0] = entities.cannonBall.position[0]
          // entities.explosion.position[1] = entities.cannonBall.position[1]

          // Increase gravity to slowly bring ball back down. 
          entities.cannonBall.velocity[1] += GRAVITY

          // WALL DETECTION
          // if hits bottom 
          if (entities.cannonBall.position[1] > windowHeight - 34) {
            isBallMoving = false;
          }

          // if hits right wall
          if (entities.cannonBall.position[0] > windowWidth - 14) {
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
          }

          // if hits left wall
          if (entities.cannonBall.position[0] < 0) {
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
          }
        }

        if (isBallMoving) {
          // Continue the animation
          animationFrameId = requestAnimationFrame(animateMovement);
        } else {
          // reset the cannonball offscreen and cancel animation frame
          entities.cannonBall.position[0] = -100
          entities.cannonBall.position[1] = windowHeight / 2;
          cancelAnimationFrame(animationFrameId);
        }
      };
      // Start the animation
      animateMovement();
    }
  });
  return entities;
};

export default fireCannonSystem;