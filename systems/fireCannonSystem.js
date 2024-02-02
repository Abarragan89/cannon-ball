import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export let isBallMoving = false;
export let animationFrameId;

const fireCannonSystem = (entities, { touches }) => {

  entities.cannon.position[0] = entities.moveCannonLaunch.position[0] + 65;

  touches.forEach(t => {

    if (t.type === "long-press") {
      // if ball is already in motion, delete it and start over
      if (isBallMoving) {
        cancelAnimationFrame(animationFrameId)
        entities.headerStats.airTime = 0;
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

          // Increase gravity to slowly bring ball back down. 
          entities.cannonBall.velocity[1] += GRAVITY

          // WALL DETECTION
          // if hits bottom 
          if (entities.cannonBall.position[1] > windowHeight - 34) {
            isBallMoving = false;
          }

          // if hits right wall
          if (entities.cannonBall.position[0] > windowWidth - 14) {
            entities.cannonBall.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
          }

          // if hits left wall
          if (entities.cannonBall.position[0] < 0) {
            entities.cannonBall.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
          }
        }

        // Offscreen Detection
        // if offscreen, show follow arrow
        if (entities.cannonBall.position[1] <= -30) {
          entities.followArrow.displayStatus = 'block';
          entities.followArrow.leftPosition = entities.cannonBall.position[0] + 5;
        } else {
          // if not offscreen, set the display back to none
          entities.followArrow.displayStatus = 'none'
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