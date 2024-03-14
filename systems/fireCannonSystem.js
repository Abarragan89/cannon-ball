import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
const { width, height } = Dimensions.get('window')

const fireBtnPos = {
  // 80 = width, 80 = absolute right
  leftX: width - (80 + 80),
  // added 80 because that is the width
  rightX: width - (80 + 80) + 80,
  // height is about 40 and it is 10 from bottom
  topY: height - 45,
  bottomY: height - 17
}


const fireCannonSystem = (entities, { touches }) => {
  // always have cannon and cannonslider lined up
  // entities.cannon.position[0] = entities.gameData.cannonLaunchPosition.current[0];

  function shootCannonBall() {
    // set the gravity, angle and power before launch
    const GRAVITY = .05;
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
    if (entities.cannonBall.position[1] > height - 34) {
      entities.cannonBall.isBallMoving = false;
      entities.headerStats.bounces = 0;
      // reset the fire button UI
      entities.fireBtn.isShooting = false;
    }
    // if hits right wall
    if (entities.cannonBall.position[0] > width - 14) {
      entities.headerStats.bounces += 1;
      entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
    }
    // if hits left wall
    // I need to also make sure it is not -100 because that is the starting position off screen
    if (entities.cannonBall.position[0] < 0 && entities.cannonBall.position[0] !== -100) {
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
    // Control the position of the cannon
    const { locationX, locationY } = t.event
    // Check if the touch occurred within the button's area
    if (
      locationX >= fireBtnPos.leftX &&
      locationX <= fireBtnPos.rightX &&
      locationY >= fireBtnPos.topY &&
      locationY <= fireBtnPos.bottomY

    ) {
      if (t.type === 'start') {
        // Reset values if ball is already moving
        if (entities.cannonBall.isBallMoving) {
          // Vibrate for feedback
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          // Reset hatchBtn if in Hatch level
          if (entities.cannonBall.isBallMoving && entities.hatchBtn) {
            entities.hatchBtn.isHit = false;
          };
          // Reset cannon Ball and fire Button UI
          entities.cannonBall.isBallMoving = false;
          entities.cannonBall.position = [-100, 0]
          entities.fireBtn.isShooting = false;
          return
        }
        // Change the fireBtn UI
        entities.fireBtn.isShooting = true;

        // Rest header stats
        entities.headerStats.airTime = 0;
        entities.headerStats.bounces = 0;
        // set isBallMoving to true
        entities.cannonBall.isBallMoving = true;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        // set initial coordinates to be where the cannon tip is located
        entities.cannonBall.position[0] = entities.cannon.position[0] + 23;
        entities.cannonBall.position[1] = entities.cannon.position[1] + 40;
        // set the POWER and ANGLE  settings
        let ANGLE = entities.angleMeter.angleLevel;
        let POWER = entities.powerMeter.displayPower;
        const angleInRadians = (ANGLE * Math.PI) / 180;
        // set the velocity
        entities.cannonBall.velocity[0] = POWER * Math.cos(angleInRadians) * 0.2;
        entities.cannonBall.velocity[1] = -POWER * Math.sin(angleInRadians) * 0.2
      }
    }
  });

  return entities;
}




export default fireCannonSystem;