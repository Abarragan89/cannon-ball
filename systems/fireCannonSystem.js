import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import cannonBallBounce from '../utils/cannonBallBounce';
const { width, height } = Dimensions.get('window')

const fireBtnPos = {
  // 80 = width, 80 = absolute right
  leftX: width - (60 + 50),
  // added 80 because that is the width
  rightX: width - (60 + 50) + 60,
  // height is about 40 and it is 10 from bottom
  bottomY: height - 20,
  // this topY should be bottomY plus the height which is 60
  topY: height - 80
}

const fireCannonSystem = (entities, { touches }) => {
  function shootCannonBall() {
    // set the gravity, angle, and power before launch
    const GRAVITY = +entities.cannonBall.cannonBallWeight;
    if (entities.cannonBall.isBallMoving) {
      // Update the X and Y based on the arc velocity
      entities.cannonBall.position[0] += entities.cannonBall.velocity[0]
      entities.cannonBall.position[1] += entities.cannonBall.velocity[1]
      // Increase gravity to slowly bring ball back down. 
      entities.cannonBall.velocity[1] += GRAVITY
    }
  }

  function wallDetection() {
    if (entities.cannonBall.isBallMoving) {
      // if hits bottom
      if (entities.cannonBall.position[1] > height - 34) {
        // only play sound once when isBallMoving is still true
        cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'cannonBallHitSandSound', entities.headerStats, entities.cannonBall, 0)
        // End the Game and reset critical variables
        entities.cannonBall.isBallMoving = false;
        entities.headerStats.bounces = 0;
        // resets the fire button UI
        entities.fireBtn.isShooting = false;
      }
      // if hits right wall
      if (entities.cannonBall.position[0] > width - 14) {
        if (entities.cannonBall.velocity[0] > 0) {
          cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'cannonBallBounceSound', entities.headerStats, entities.cannonBall, 0)
        }
      }
      // if hits left wall
      // I need to also make sure it is not -100 because that is the starting position off screen
      if (entities.cannonBall.position[0] < 0 && entities.cannonBall.position[0] !== -100) {
        if (entities.cannonBall.velocity[0] < 0) {
          cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'cannonBallBounceSound', entities.headerStats, entities.cannonBall, 0)
        }
      }
    }


    /////////// THIS TRIGGERS THE WIN SEQUENCE IF HITS BOTTOM FOR TESTING PURPOSES /////////
    ////////////// ERASE THIS ///////////////////////////
    // entities.gameData.isGameOver = true;
    // entities.gameData.setIsGameOver(true);

    // // coordinates for the bottom of the ball
    // const ballXCoord = entities.cannonBall.position[0] + 10;
    // const ballYCoord = entities.cannonBall.position[1] + 20;

    // // coordinate for the top center of the TNT
    // const tntXCoord = entities.TNT.position[0] + 15;
    // const tntYCoord = entities.TNT.position[1] - 2;

    // // calculate the length of both sides
    // const triangleASide = Math.abs(ballXCoord - tntXCoord);
    // const triangeBSide = Math.abs(ballYCoord - tntYCoord);

    // const accuracyAmount = (Math.sqrt(triangleASide ** 2 + triangeBSide ** 2)).toFixed(2);

    // if (accuracyAmount >= 15) {
    //   entities.cannonBall.accuracy =
    //   {
    //     name: 'Good Shot',
    //     float: accuracyAmount,
    //     multiplier: 2,

    //   }
    // } else if (accuracyAmount >= 5) {
    //   entities.cannonBall.accuracy =
    //   {
    //     name: 'Great Shot!',
    //     float: accuracyAmount,
    //     multiplier: 3,
    //   }
    // } else {
    //   entities.cannonBall.accuracy =
    //   {
    //     name: 'Perfect Shot!!!',
    //     float: accuracyAmount,
    //     multiplier: 5,
    //   }
    // }

    // // pass all the relevant data to end game modal
    // entities.gameData.endGameData.current.accuracyFloat = entities.cannonBall.accuracy.float;
    // entities.gameData.endGameData.current.accuracyName = entities.cannonBall.accuracy.name;
    // entities.gameData.endGameData.current.multiplier = entities.cannonBall.accuracy.multiplier
    // entities.gameData.endGameData.current.airTime = entities.headerStats.airTime;
    // entities.gameData.endGameData.current.bounces = entities.headerStats.bounces + 1;

    // /////////////////////////////////////////////////////////////
  }


  function showFollowArrowDetection() {
    // Offscreen Detection
    // if offscreen, show follow arrow
    if (entities.cannonBall.position[1] <= -20) {
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
          // Vibrate for feedback if setting is set for On
          if (entities.gameData.isHapticsOn > 0) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
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
        // Play Cannon Sound
        if (entities.gameData.isSoundEffectsOn > 0) {
          try {
            entities.sounds.shootCannonSound.replayAsync();
          } catch (error) {
            console.log('error in shoot cannon sound ', error)
          }
        }
        // Change the fireBtn UI
        entities.fireBtn.isShooting = true;
        // Rest header stats
        entities.headerStats.airTime = 0;
        entities.headerStats.bounces = 0;
        // set isBallMoving to true
        entities.cannonBall.isBallMoving = true;
        if (entities.gameData.isHapticsOn > 0) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        // set initial coordinates to be where the cannon base is located
        // calibrate exit point based on cannonball size
        const cannonBallSizeCalibration = 13 - entities.cannonBall.cannonBallRadius
        entities.cannonBall.position[0] = entities.cannon.position[0] + 20 + cannonBallSizeCalibration
        entities.cannonBall.position[1] = entities.cannon.position[1] + 40;
        
        // set the POWER and ANGLE  settings
        let ANGLE = entities.angleMeter.angleLevel;
        // Multiply the power by the weight
        // let POWER = entities.powerMeter.displayPower * entities.cannonBall.cannonBallWeight;
        let POWER = entities.powerMeter.displayPower;
        const angleInRadians = (ANGLE * Math.PI) / 180;
        // set the velocity
        entities.cannonBall.velocity[0] = POWER * Math.cos(angleInRadians) * 0.195;
        entities.cannonBall.velocity[1] = -POWER * Math.sin(angleInRadians) * 0.195;
      }
    }
  });

  return entities;
}


export default fireCannonSystem;