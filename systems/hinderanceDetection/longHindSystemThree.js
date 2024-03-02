// import hinderanceDetection from '../../utils/detectionFunction';

const longHindSystemThree = (entities) => {
    // LEFT LINE OF HINDERANCE BOX
    const leftLineX1 = entities.longHindThree.position[0];
    const leftLineY1 = entities.longHindThree.position[1] + 3;
    const leftLineX2 = entities.longHindThree.position[0];
    const leftLineY2 = entities.longHindThree.position[1] + 30;
    
    // RIGHT LINE OF HINDERANCE BOX
    const rightLineX1 = entities.longHindThree.position[0] + 117;
    const rightLineY1 = entities.longHindThree.position[1] + 3;
    const rightLineX2 = entities.longHindThree.position[0] + 117;
    const rightLineY2 = entities.longHindThree.position[1] + 30;
    
    
    // BOTTOM LINE OF HINDERANCE BOX
    const bottomLineX1 = entities.longHindThree.position[0] + 3;
    const bottomLineY1 = entities.longHindThree.position[1] + 30;
    const bottomLineX2 = entities.longHindThree.position[0] + 117;
    const bottomLineY2 = entities.longHindThree.position[1] + 30;
    
    // TOP LINE OF HINDERANCE BOX
    const topLineX1 = entities.longHindThree.position[0];
    const topLineY1 = entities.longHindThree.position[1];
    const topLineX2 = entities.longHindThree.position[0] + 117;
    const topLineY2 = entities.longHindThree.position[1];
    
    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + 10;
    const circleY = entities.cannonBall.position[1] + 10;

    
    ///////////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
    const leftDistance1 = Math.sqrt((leftLineX1 - circleX) ** 2 + (leftLineY1 - circleY) ** 2);
    const leftDistance2 = Math.sqrt((leftLineX2 - circleX) ** 2 + (leftLineY2 - circleY) ** 2);
    
    if (leftDistance1 <= radius || leftDistance2 <= radius) {
        // only change direction if it is not already going in the desired location
        if (entities.cannonBall.velocity[0] > 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
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
                // add to bounce count
                entities.headerStats.bounces += 1;
                entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
            }
        };
    }


    ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
    const rightDistance1 = Math.sqrt((rightLineX1 - circleX) ** 2 + (rightLineY1 - circleY) ** 2);
    const rightDistance2 = Math.sqrt((rightLineX2 - circleX) ** 2 + (rightLineY2 - circleY) ** 2);
    if (rightDistance1 <= radius || rightDistance2 <= radius) {
        if (entities.cannonBall.velocity[0] < 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
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
                // add to bounce count
                entities.headerStats.bounces += 1;
                entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
            }
        };
    }



    ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
    const bottomDistance1 = Math.sqrt((bottomLineX1 - circleX) ** 2 + (bottomLineY1 - circleY) ** 2);
    const bottomDistance2 = Math.sqrt((bottomLineX2 - circleX) ** 2 + (bottomLineY2 - circleY) ** 2);
    // checks to see if corners are hit
    if (bottomDistance1 <= radius || bottomDistance2 <= radius) {
        if (entities.cannonBall.velocity[1] < 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1]
        }

    }
    // Calculate the vector representing the line segment
    const bottomLineVectorX = bottomLineX2 - bottomLineX1;
    const bottomLineVectorY = bottomLineY2 - bottomLineY1;

    // Calculate the vector representing the line from one endpoint to the circle center
    const bottomCircleVectorX = circleX - bottomLineX1;
    const bottomCircleVectorY = circleY - bottomLineY1;

    // Calculate the projection of the circle vector onto the line vector
    const bottomProjection = (bottomCircleVectorX * bottomLineVectorX + bottomCircleVectorY * bottomLineVectorY) / (bottomLineVectorX * bottomLineVectorX + bottomLineVectorY * bottomLineVectorY);

    // Check if the bottomProjection is within the line segment
    if (bottomProjection >= 0 && bottomProjection <= 1) {
        // Find the closest point on the line to the circle center
        const closestX = bottomLineX1 + bottomProjection * bottomLineVectorX;
        const closestY = bottomLineY1 + bottomProjection * bottomLineVectorY;

        // Calculate the distance between the closest point on the line and the circle center
        const distanceToLine = Math.sqrt((circleX - closestX) ** 2 + (circleY - closestY) ** 2);

        // Check if the distance is less than or equal to the radius of the circle
        if (distanceToLine <= radius) {
            if (entities.cannonBall.velocity[1] < 0) {
                // add to bounce count
                entities.headerStats.bounces += 1;
                entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1]
            }
        };
    }

     ////////////////// CHECKING FOR TOP WALL DETECTION /////////////////
     const topDistance1 = Math.sqrt((topLineX1 - circleX) ** 2 + (topLineY1 - circleY) ** 2);
     const topDistance2 = Math.sqrt((topLineX2 - circleX) ** 2 + (topLineY2 - circleY) ** 2);

     // checks to see if corners are hit
     if (topDistance1 <= radius || topDistance2 <= radius) {
         if (entities.cannonBall.velocity[1] > 0) {
             // add to bounce count
             entities.headerStats.bounces += 1;
             // Multiply with the bounce level to create slow-down
             entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
         }
 
     }
     // Calculate the vector representing the line segment
     const topLineVectorX = topLineX2 - topLineX1;
     const topLineVectorY = topLineY2 - topLineY1;
 
     // Calculate the vector representing the line from one endpoint to the circle center
     const topCircleVectorX = circleX - topLineX1;
     const topCircleVectorY = circleY - topLineY1;
 
     // Calculate the projection of the circle vector onto the line vector
     const topProjection = (topCircleVectorX * topLineVectorX + topCircleVectorY * topLineVectorY) / (topLineVectorX * topLineVectorX + topLineVectorY * topLineVectorY);
 
     // Check if the topProjection is within the line segment
     if (topProjection >= 0 && topProjection <= 1) {
         // Find the closest point on the line to the circle center
         const closestX = topLineX1 + topProjection * topLineVectorX;
         const closestY = topLineY1 + topProjection * topLineVectorY;
 
         // Calculate the distance between the closest point on the line and the circle center
         const distanceToLine = Math.sqrt((circleX - closestX) ** 2 + (circleY - closestY) ** 2);
 
         // Check if the distance is less than or equal to the radius of the circle
         if (distanceToLine <= radius) {
             if (entities.cannonBall.velocity[1] > 0) {
                 // add to bounce count
                 entities.headerStats.bounces += 1;
                 entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
             }
         };
     }

    return entities;
}

export default longHindSystemThree;