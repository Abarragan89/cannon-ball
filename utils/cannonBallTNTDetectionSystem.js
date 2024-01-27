const cannonBallTNTDetectionSystem = (entities) => {
    // Variables to determine collision of Cannon Ball and Top of TNT
    // the X1 adn X2 lines are slightly within the TNT box. It needs to appear
    // as if it is hitting the handle. Therefore, i added 5 to the first X1 and
    // did not all the total 30 px length (only added 25)

    // ** This only works if the TNT box is right side up. 
    // Need to make this dynamic if i want to rotate it. 

    // RIGHT LINE OF TNT BOX
    // the box is 10 by 10. I'm using 2 and 28 so it
    // won't get stuck in the corner with the top detection
    const rightLineX1 = entities.TNT.position[0];
    const rightLineY1 = entities.TNT.position[1] + 5;
    const rightLineX2 = entities.TNT.position[0];
    const rightLineY2 = entities.TNT.position[1] + 25;

    // LEFT LINE OF TNT BOX
    // the box is 10 by 10. I'm using 2 and 28 so it
    // won't get stuck in the corner with the top detection
    const leftLineX1 = entities.TNT.position[0] + 30;
    const leftLineY1 = entities.TNT.position[1] + 5;
    const leftLineX2 = entities.TNT.position[0] + 30;
    const leftLineY2 = entities.TNT.position[1] + 25;

    // CIRCLE PROPERTIES
    const radius = 10
    const circleX = entities.cannonBall.position[0] + 5;
    const circleY = entities.cannonBall.position[1] + 5;

    // CHECKING FOR RIGHT WALL DETECTION
    const rightDistance1 = Math.sqrt((rightLineX1 - circleX) ** 2 + (rightLineY1 - circleY) ** 2);
    const rightDistance2 = Math.sqrt((rightLineX2 - circleX) ** 2 + (rightLineY2 - circleY) ** 2);

    if (rightDistance1 <= radius || rightDistance2 <= radius) {
        console.log('hit right')
        entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
    }

    //  CHECKING FOR LEFT WALL DETECTION
    const leftDistance1 = Math.sqrt((leftLineX1 - circleX) ** 2 + (leftLineY1 - circleY) ** 2);
    const leftDistance2 = Math.sqrt((leftLineX2 - circleX) ** 2 + (leftLineY2 - circleY) ** 2);

    if (leftDistance1 <= radius || leftDistance2 <= radius) {
        console.log('hit left')
        entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
    }

    return entities;
}

export default cannonBallTNTDetectionSystem;