//  This only needs to detect bottom since it works as the roof
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window')

const extraLongHindSystemOne = (entities) => {
    
    // BOTTOM LINE OF HINDERANCE BOX
    const bottomLineX1 = entities.extraLongHindOne.position[0];
    const bottomLineY1 = entities.extraLongHindOne.position[1] + 10;
    const bottomLineX2 = entities.extraLongHindOne.position[0] + width + 10;
    const bottomLineY2 = entities.extraLongHindOne.position[1] + 10;

    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + 10;
    const circleY = entities.cannonBall.position[1] + 10;

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

    return entities;
}

export default extraLongHindSystemOne;