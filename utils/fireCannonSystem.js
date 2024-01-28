import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fireCannonSystem = (entities, { touches }) => {

  let isBallMoving = false;
  touches.forEach(t => {
    if (t.type === "long-press" && !isBallMoving) {
      isBallMoving = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
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
          entities.cannonBall.position[0] += entities.cannonBall.velocity[0] / 2
          entities.cannonBall.position[1] += entities.cannonBall.velocity[1] / 2
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
          requestAnimationFrame(animateMovement);
        } else {
          setTimeout(() => {
            entities.cannonBall.position[0] = 600
            entities.cannonBall.position[1] = windowHeight / 2;
          }, 2000);
        }
      };
      // Start the animation
      animateMovement();
    }
  });
  return entities;
};

export default fireCannonSystem;