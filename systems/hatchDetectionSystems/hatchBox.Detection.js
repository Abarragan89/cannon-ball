const hatchBoxDetectionSystem = (entities) => {
    // LEFT LINE OF HINDERANCE BOX
    const leftLineX1 = entities.hatchBox.position[0];
    const leftLineY1 = entities.hatchBox.position[1];
    const leftLineX2 = entities.hatchBox.position[0];
    const leftLineY2 = entities.hatchBox.position[1] + 60;

    // RIGHT LINE OF HINDERANCE BOX
    // same as rightLine, I didn't make the coordinate exactly based on the 40px size of Hinderance
    const rightLineX1 = entities.hatchBox.position[0] + 60;
    const rightLineY1 = entities.hatchBox.position[1];
    const rightLineX2 = entities.hatchBox.position[0] + 60;
    const rightLineY2 = entities.hatchBox.position[1] + 60;

    // BOTTOM LINE OF HINDERANCE BOX
    // same as bottomLine, I didn't make the coordinate exactly based on the 40px size of Hinderance
    const bottomLineX1 = entities.hatchBox.position[0];
    const bottomLineY1 = entities.hatchBox.position[1] + 60;
    const bottomLineX2 = entities.hatchBox.position[0] + 60;
    const bottomLineY2 = entities.hatchBox.position[1] + 60;

    // TOP Left LINE OF HINDERANCE BOX
    const topLeftLineX1 = entities.hatchBox.position[0];
    const topLeftLineY1 = entities.hatchBox.position[1];
    const topLeftLineX2 = entities.hatchBox.position[0] + 5;
    const topLeftLineY2 = entities.hatchBox.position[1];

    // TOP Right LINE OF HINDERANCE BOX
    const topRightLineX1 = entities.hatchBox.position[0] + 52
    const topRightLineY1 = entities.hatchBox.position[1];
    const topRightLineX2 = entities.hatchBox.position[0] + 57;
    const topRightLineY2 = entities.hatchBox.position[1];

    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + 10;
    const circleY = entities.cannonBall.position[1] + 10;

    ///////////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
    const leftDistance1 = Math.sqrt((leftLineX1 - circleX) ** 2 + (leftLineY1 - circleY) ** 2);
    const leftDistance2 = Math.sqrt((leftLineX2 - circleX) ** 2 + (leftLineY2 - circleY) ** 2);

    if (leftDistance1 <= radius || leftDistance2 <= radius) {

        // I commented this out because it was producing weird effects in level 4.
        // Conflict may arise if I use this in another level.  

        // only change direction if it is not already going in the desired location
        if (entities.cannonBall.velocity[0] > 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0];
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
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0];
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



    ////////////////// CHECKING FOR LEFT TOP WALL DETECTION /////////////////
    const topLeftDistance1 = Math.sqrt((topLeftLineX1 - circleX) ** 2 + (topLeftLineY1 - circleY) ** 2);
    const topLeftDistance2 = Math.sqrt((topLeftLineX2 - circleX) ** 2 + (topLeftLineY2 - circleY) ** 2);

    // checks to see if corners are hit
    if (topLeftDistance1 <= radius || topLeftDistance2 <= radius) {
        if (entities.cannonBall.velocity[1] > 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
            if (entities.hatchBtn.isTriggerOntopLeft) {
                entities.hatchBtn.isHit = true;
            }
        }

    }
    // Calculate the vector representing the line segment
    const topLeftLineVectorX = topLeftLineX2 - topLeftLineX1;
    const topLeftLineVectorY = topLeftLineY2 - topLeftLineY1;

    // Calculate the vector representing the line from one endpoint to the circle center
    const topLeftCircleVectorX = circleX - topLeftLineX1;
    const topLeftCircleVectorY = circleY - topLeftLineY1;

    // Calculate the projection of the circle vector onto the line vector
    const topLeftProjection = (topLeftCircleVectorX * topLeftLineVectorX + topLeftCircleVectorY * topLeftLineVectorY) / (topLeftLineVectorX * topLeftLineVectorX + topLeftLineVectorY * topLeftLineVectorY);

    // Check if the topLeftProjection is within the line segment
    if (topLeftProjection >= 0 && topLeftProjection <= 1) {
        // Find the closest point on the line to the circle center
        const closestX = topLeftLineX1 + topLeftProjection * topLeftLineVectorX;
        const closestY = topLeftLineY1 + topLeftProjection * topLeftLineVectorY;

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


    ////////////////// CHECKING FOR Right TOP WALL DETECTION /////////////////
    const topRightDistance1 = Math.sqrt((topRightLineX1 - circleX) ** 2 + (topRightLineY1 - circleY) ** 2);
    const topRightDistance2 = Math.sqrt((topRightLineX2 - circleX) ** 2 + (topRightLineY2 - circleY) ** 2);

    // checks to see if corners are hit
    if (topRightDistance1 <= radius || topRightDistance2 <= radius) {
        if (entities.cannonBall.velocity[1] > 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
            if (entities.hatchBtn.isTriggerOntopRight) {
                entities.hatchBtn.isHit = true;
            }
        }

    }
    // Calculate the vector representing the line segment
    const topRightLineVectorX = topRightLineX2 - topRightLineX1;
    const topRightLineVectorY = topRightLineY2 - topRightLineY1;

    // Calculate the vector representing the line from one endpoint to the circle center
    const topRightCircleVectorX = circleX - topRightLineX1;
    const topRightCircleVectorY = circleY - topRightLineY1;

    // Calculate the projection of the circle vector onto the line vector
    const topRightProjection = (topRightCircleVectorX * topRightLineVectorX + topRightCircleVectorY * topRightLineVectorY) / (topRightLineVectorX * topRightLineVectorX + topRightLineVectorY * topRightLineVectorY);

    // Check if the topRightProjection is within the line segment
    if (topRightProjection >= 0 && topRightProjection <= 1) {
        // Find the closest point on the line to the circle center
        const closestX = topRightLineX1 + topRightProjection * topRightLineVectorX;
        const closestY = topRightLineY1 + topRightProjection * topRightLineVectorY;

        // Calculate the distance between the closest point on the line and the circle center
        const distanceToLine = Math.sqrt((circleX - closestX) ** 2 + (circleY - closestY) ** 2);

        // Check if the distance is less than or equal to the radius of the circle
        if (distanceToLine <= radius) {
            if (entities.cannonBall.velocity[1] > 0) {
                // add to bounce count
                entities.headerStats.bounces += 1;
                entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
                if (entities.hatchBtn.isTriggerOnTop) {
                    entities.hatchBtn.isHit = true;
                }
            }
        };
    }

    return entities;
}

export default hatchBoxDetectionSystem;