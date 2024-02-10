import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const fireCannonSystem = (entities, { touches }) => {
  // always have cannon and cannonslider lined up
  entities.cannon.position[0] = entities.gameData.cannonLaunchPosition.current[0] + 65;
  // set the gravity, angle and power before launch
  const GRAVITY = .05

  function shootCannonBall() {
    if (entities.cannonBall.isBallMoving) {
      // Update the X and Y based on the arc velocity
      entities.cannonBall.position[0] += entities.cannonBall.velocity[0]
      entities.cannonBall.position[1] += entities.cannonBall.velocity[1]
      // Increase gravity to slowly bring ball back down. 
      entities.cannonBall.velocity[1] += GRAVITY
    }
  }

  function wallDetection() {
    // if hits bottom
    if (entities.cannonBall.position[1] > windowHeight - 34) {
      entities.cannonBall.isBallMoving = false;
    }
    // if hits right wall
    if (entities.cannonBall.position[0] > windowWidth - 14) {
      entities.headerStats.bounces += 1;
      entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
    }
    // if hits left wall
    if (entities.cannonBall.position[0] < 0) {
      entities.headerStats.bounces += 1;
      entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
    }
  }
  
  function showFollowArrowDetection() {
    // Offscreen Detection
    // if offscreen, show follow arrow
    if (entities.cannonBall.position[1] <= -30) {
      entities.followArrow.displayStatus = 'block';
      entities.followArrow.leftPosition = entities.cannonBall.position[0] + 5;
    } else {
      // if not offscreen, set the display back to none
      entities.followArrow.displayStatus = 'none'
    }
  }

  showFollowArrowDetection();
  shootCannonBall();
  wallDetection();
  
  touches.forEach(t => {
    if (t.type === "long-press") {
        entities.headerStats.airTime = 0;
        // set isBallMoving to true
        entities.cannonBall.isBallMoving = true;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        // set initial coordinates to be where the cannon tip is located
        entities.cannonBall.position[0] = entities.cannon.position[0] + 25;
        entities.cannonBall.position[1] = entities.cannon.position[1] + 40;
        // set the POWER and ANGLE  settings
        let ANGLE = entities.gameData.angleLevel.current;
        let POWER = entities.gameData.powerLevel;
        const angleInRadians = (ANGLE * Math.PI) / 180;
        // set the velocity
        entities.cannonBall.velocity[0] = POWER * Math.cos(angleInRadians) * 0.2;
        entities.cannonBall.velocity[1] = -POWER * Math.sin(angleInRadians) * 0.2
      }
    // }

  });
  return entities;
}




export default fireCannonSystem;