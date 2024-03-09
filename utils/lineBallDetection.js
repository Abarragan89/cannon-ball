export default lineBallDetection = (lineX1, lineY1, lineX2, lineY2, circleX, circleY, radius) => {
    const leftDistance1 = Math.sqrt((lineX1 - circleX) ** 2 + (lineY1 - circleY) ** 2);
    const leftDistance2 = Math.sqrt((lineX2 - circleX) ** 2 + (lineY2 - circleY) ** 2);

    if (leftDistance1 <= radius || leftDistance2 <= radius) {
        return true;
    }
    // Calculate the vector representing the line segment
    const lineVectorX = lineX2 - lineX1;
    const lineVectorY = lineY2 - lineY1;

    // Calculate the vector representing the line from one endpoint to the circle center
    const circleVectorX = circleX - lineX1;
    const circleVectorY = circleY - lineY1;

    // Calculate the projection of the circle vector onto the line vector
    const projection = (circleVectorX * lineVectorX + circleVectorY * lineVectorY) / (lineVectorX * lineVectorX + lineVectorY * lineVectorY);

    // Check if the projection is within the line segment
    if (projection >= 0 && projection <= 1) {
        // Find the closest point on the line to the circle center
        const closestX = lineX1 + projection * lineVectorX;
        const closestY = lineY1 + projection * lineVectorY;

        // Calculate the distance between the closest point on the line and the circle center
        const distanceToLine = Math.sqrt((circleX - closestX) ** 2 + (circleY - closestY) ** 2);

        // Check if the distance is less than or equal to the radius of the circle
        if (distanceToLine <= radius) {
            return true
        };
    }

    return false;
}