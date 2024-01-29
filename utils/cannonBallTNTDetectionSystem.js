const cannonBallTNTDetectionSystem = (entities, { time }) => {
    // Variables to determine collision of Cannon Ball and Top of TNT
    // the X1 adn X2 lines are slightly within the TNT box. It needs to appear
    // as if it is hitting the handle. Therefore, i added 5 to the first X1 and
    // did not all the total 30 px length (only added 25)

    // ** This only works if the TNT box is right side up. 
    // Need to make this dynamic if i want to rotate it. 

    // Left LINE OF TNT BOX
    // the box is 30 by 30. I added a 5px perimeter around it so it looks like 
    // it bounces left when the cannon touches it. 
    const leftLineX1 = entities.TNT.position[0];
    // minus 5 will raise this higher to cover handle a little bit.
    const leftLineY1 = entities.TNT.position[1];
    const leftLineX2 = entities.TNT.position[0];
    const leftLineY2 = entities.TNT.position[1] + 20;

    // Right LINE OF TNT BOX
    // same as rightLine, I didn't make the coordinate exactly based on the 30px size of tnt
    const rightLineX1 = entities.TNT.position[0] + 30;
    const rightLineY1 = entities.TNT.position[1];
    const rightLineX2 = entities.TNT.position[0] + 30;
    const rightLineY2 = entities.TNT.position[1] + 20;


    // BOTTOM LINE OF TNT BOX
    // same as bottomLine, I didn't make the coordinate exactly based on the 30px size of tnt
    const bottomLineX1 = entities.TNT.position[0] - 10;
    const bottomLineY1 = entities.TNT.position[1] + 30;
    const bottomLineX2 = entities.TNT.position[0] + 20;
    const bottomLineY2 = entities.TNT.position[1] + 30;

    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + 5;
    const circleY = entities.cannonBall.position[1] + 5;

    ///////////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
    const leftDistance1 = Math.sqrt((leftLineX1 - circleX) ** 2 + (leftLineY1 - circleY) ** 2);
    const leftDistance2 = Math.sqrt((leftLineX2 - circleX) ** 2 + (leftLineY2 - circleY) ** 2);
    if (leftDistance1 <= radius || leftDistance2 <= radius) {
        console.log('hit left')
        // only change direction if it is not already going in the desired location
        if (entities.cannonBall.velocity[0] > 0) {
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
        }
    }
    // Calculate the vector representing the line segment
    const lineVectorX = leftLineX2 - leftLineX1;
    const lineVectorY = leftLineY2 - leftLineY1;

    // Calculate the vector representing the line from one endpoint to the circle center
    const circleVectorX = circleX - leftLineX1;
    const circleVectorY = circleY - leftLineY1;

    // Calculate the projection of the circle vector onto the line vector
    const projection = (circleVectorX * lineVectorX + circleVectorY * lineVectorY) / (lineVectorX * lineVectorX + lineVectorY * lineVectorY);

    // Check if the projection is within the line segment
    if (projection >= 0 && projection <= 1) {
        // Find the closest point on the line to the circle center
        const closestX = leftLineX1 + projection * lineVectorX;
        const closestY = leftLineY1 + projection * lineVectorY;

        // Calculate the distance between the closest point on the line and the circle center
        const distanceToLine = Math.sqrt((circleX - closestX) ** 2 + (circleY - closestY) ** 2);

        // Check if the distance is less than or equal to the radius of the circle
        if (distanceToLine <= radius) {
            if (entities.cannonBall.velocity[0] > 0) {
                entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
            }
        };
    }






    ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
    const rightDistance1 = Math.sqrt((rightLineX1 - circleX) ** 2 + (rightLineY1 - circleY) ** 2);
    const rightDistance2 = Math.sqrt((rightLineX2 - circleX) ** 2 + (rightLineY2 - circleY) ** 2);
    if (rightDistance1 <= radius || rightDistance2 <= radius) {
        console.log('hit right')
        if (entities.cannonBall.velocity[0] < 0) {
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
        }    
    }
    // Calculate the vector representing the line segment
    const rightLineVectorX = rightLineX2 - rightLineX1;
    const rightLineVectorY = rightLineY2 - rightLineY1;

    // Calculate the vector representing the line from one endpoint to the circle center
    const rightCircleVectorX = circleX - rightLineX1;
    const rightCircleVectorY = circleY - rightLineY1;

    // Calculate the projection of the circle vector onto the line vector
    const rightProjection = (rightCircleVectorX * rightLineVectorX + rightCircleVectorY * rightLineVectorY) / (rightLineVectorX * rightLineVectorX + rightLineVectorY * rightLineVectorY);

    // Check if the rightProjection is within the line segment
    if (rightProjection >= 0 && rightProjection <= 1) {
        // Find the closest point on the line to the circle center
        const closestX = rightLineX1 + rightProjection * rightLineVectorX;
        const closestY = rightLineY1 + rightProjection * rightLineVectorY;

        // Calculate the distance between the closest point on the line and the circle center
        const distanceToLine = Math.sqrt((circleX - closestX) ** 2 + (circleY - closestY) ** 2);

        // Check if the distance is less than or equal to the radius of the circle
        if (distanceToLine <= radius) {
            if (entities.cannonBall.velocity[0] < 0) {
                entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
            }
        };
    }





    ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
    const bottomDistance1 = Math.sqrt((bottomLineX1 - circleX) ** 2 + (bottomLineY1 - circleY) ** 2);
    const bottomDistance2 = Math.sqrt((bottomLineX2 - circleX) ** 2 + (bottomLineY2 - circleY) ** 2);

    // checks to see if corners are hit
    if (bottomDistance1 <= radius + 2 || bottomDistance2 <= radius + 2) {
        console.log('hit bottom')
        if (entities.cannonBall.velocity[1] < 0) {
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1]
        }

    }

    // Calculate the vector representing the line segment
    const bottomLineVectorX = leftLineX2 - leftLineX1;
    const bottomLineVectorY = leftLineY2 - leftLineY1;

    // Calculate the vector representing the line from one endpoint to the circle center
    const leftCircleVectorX = circleX - leftLineX1;
    const leftCircleVectorY = circleY - leftLineY1;

    // Calculate the projection of the circle vector onto the line vector
    const leftProjection = (leftCircleVectorX * bottomLineVectorX + leftCircleVectorY * bottomLineVectorY) / (bottomLineVectorX * bottomLineVectorX + bottomLineVectorY * bottomLineVectorY);

    // Check if the leftProjection is within the line segment
    if (leftProjection >= 0 && leftProjection <= 1) {
        // Find the closest point on the line to the circle center
        const closestX = leftLineX1 + leftProjection * bottomLineVectorX;
        const closestY = leftLineY1 + leftProjection * bottomLineVectorY;

        // Calculate the distance between the closest point on the line and the circle center
        const distanceToLine = Math.sqrt((circleX - closestX) ** 2 + (circleY - closestY) ** 2);

        // Check if the distance is less than or equal to the radius of the circle
        if (distanceToLine <= radius) {
            if (entities.cannonBall.velocity[1] < 0) {
                entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1]
            }
        };
    }

    return entities;
}

export default cannonBallTNTDetectionSystem;