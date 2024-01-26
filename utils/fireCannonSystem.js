import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fireCannonSystem = (entities, { touches }) => {

  let isBallMoving = false;
  touches.forEach(t => {
    if (t.type === "long-press" && !isBallMoving) {
      isBallMoving = true;
      let wallHit = 'none'
      let hitTop = false;
      let hitBottom = false;
      let hitRightWall = false;
      let hitLeftWall = false;
      let speedRate = .2

      // let XV = 0.5
      // let YV = 1.2

      let XV = 2
      let YV = 2


      const animateMovement = () => {
        if (isBallMoving) {
          // switch (wallHit) {
          //   case 'none':
          //     entities.cannonBall.position[0] += Math.cos(XV) + speedRate;
          //     entities.cannonBall.position[1] -= Math.sin(YV) + speedRate;
          //     break;
          //   case 'top':
          //     entities.cannonBall.position[0] += Math.cos(XV) + speedRate;
          //     entities.cannonBall.position[1] += Math.sin(YV) + speedRate;
          //     break;
          //   case 'bottom':
          //     entities.cannonBall.position[0] += Math.cos(XV) + speedRate;
          //     entities.cannonBall.position[1] += Math.sin(YV) + speedRate;
          //     break;
          //   case 'left':
          //     entities.cannonBall.position[0] += Math.cos(XV) + speedRate;
          //     entities.cannonBall.position[1] -= Math.sin(YV) + speedRate;
          //     break;
          //   case 'right':
          //     entities.cannonBall.position[0] -= Math.cos(XV) + speedRate;
          //     entities.cannonBall.position[1] -= Math.sin(YV) + speedRate;
          //     break;

          // }

          // if (hitRightWall) {
          //   entities.cannonBall.position[0] -= Math.cos(XV) + .2;
          //   entities.cannonBall.position[1] -= Math.sin(YV) + .2;
          // } else if (hitLeftWall) {
          //   entities.cannonBall.position[0] += Math.cos(XV) + .2;
          //   entities.cannonBall.position[1] -= Math.sin(YV) + .2;
          // } else if (hitBottom) {
          //   entities.cannonBall.position[0] += Math.cos(XV) + .2;
          //   entities.cannonBall.position[1] += Math.sin(YV) + .2;
          // } else if (hitTop) {
          //   entities.cannonBall.position[0] += Math.cos(XV) + .2;
          //   entities.cannonBall.position[1] += Math.sin(YV) + .2;
          // }
          // else {
          //   entities.cannonBall.position[0] += Math.cos(XV) + .2;
          //   entities.cannonBall.position[1] -= Math.sin(YV) + .2;
          // }

          // entities.cannonBall.position[0] += Math.cos(XV) + .2;
          // entities.cannonBall.position[1] -= Math.sin(YV) + .2;

          entities.cannonBall.position[0] += XV;
          entities.cannonBall.position[1] -= YV;

          XV -= .001;
          YV -= .04;
          // console.log(XV)
          // XV = XV < 0 ? 0 : XV;
          // YV = YV < 0 ? 0 : YV;
        }

        // if hits bottom 
        if (entities.cannonBall.position[1] > windowHeight - 24) {
          // wallHit = 'bottom';
          // hitBottom = true
          // XV = -XV;
          YV = -YV;
          // isBallMoving = false;
        }

        // if hits top
        if (entities.cannonBall.position[1] < 14) {
          // hitTop = true
          // wallHit = 'top';
          // XV = -XV;
          YV = -YV
        }

        // if hits right wall
        if (entities.cannonBall.position[0] > windowWidth - 14) {
          // hitRightWall = true;
          // wallHit = 'right'
          // speedRate -= .1
          // XV = -XV;
          // YV = -YV
          console.log('x velocity in right wall', XV)
          XV = -XV
          console.log('x velocity in right wall AFTER', XV)

        }

        // if hits left wall
        if (entities.cannonBall.position[0] < 0) {
          // hitLeftWall = true
          // XV = -XV;
          XV = -XV
        }

        if (isBallMoving) {
          // Continue the animation
          requestAnimationFrame(animateMovement);
        } else {
          // Animation complete
          isBallMoving = false;
        }
      };

      // Start the animation
      animateMovement();
    }
  });
  return entities;
};

export default fireCannonSystem;