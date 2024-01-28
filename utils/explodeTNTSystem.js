const explodeTNTSystem = (entities) => {
    // Variables to determine collision of Cannon Ball and Top of TNT
    // the X1 adn X2 lines are slightly within the TNT box. It needs to appear
    // as if it is hitting the handle. Therefore, i added 5 to the first X1 and
    // did not all the total 30 px length (only added 25)
    const lineX1 = entities.TNT.position[0] + 5;
    const lineY1 = entities.TNT.position[1] - 8;
    const lineX2 = entities.TNT.position[0] + 25;
    const lineY2 = entities.TNT.position[1] - 8;
    // increase radius to 14 on top so it doesn't interfere with side detection
    // also, handle sticks out
    const radius = 10
    const circleX = entities.cannonBall.position[0] + 5;
    const circleY = entities.cannonBall.position[1] + 5;

    // Check if either endpoint of the line is inside the circle
    const distance1 = Math.sqrt((lineX1 - circleX) ** 2 + (lineY1 - circleY) ** 2);
    const distance2 = Math.sqrt((lineX2 - circleX) ** 2 + (lineY2 - circleY) ** 2);

    if (distance1 <= radius || distance2 <= radius) {
        console.log('hit top')
        // Lower TNT handle
        entities.TNT.handlePosition = -6;
        // Bounce ball off TNT
        entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * 2
    }


//     // Calculate the vector representing the line segment
//   const lineVectorX = lineX2 - lineX1;
//   const lineVectorY = lineY2 - lineY1;

//   // Calculate the vector representing the line from one endpoint to the circle center
//   const circleVectorX = circleX - lineX1;
//   const circleVectorY = circleY - lineY1;

//   // Calculate the projection of the circle vector onto the line vector
//   const projection = (circleVectorX * lineVectorX + circleVectorY * lineVectorY) / (lineVectorX * lineVectorX + lineVectorY * lineVectorY);

//   // Check if the projection is within the line segment
//   if (projection >= 0 && projection <= 1) {
//     // Find the closest point on the line to the circle center
//     const closestX = lineX1 + projection * lineVectorX;
//     const closestY = lineY1 + projection * lineVectorY;

//     // Calculate the distance between the closest point on the line and the circle center
//     const distanceToLine = Math.sqrt((circleX - closestX) ** 2 + (circleY - closestY) ** 2);

//     // Check if the distance is less than or equal to the radius of the circle
//     if (distanceToLine <= radius) {
//         console.log('hit top')
//         // Lower TNT handle
//         entities.TNT.handlePosition = -6;
//         // Bounce ball off TNT
//         entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * 2
//     };
//   }
    return entities;

}

export default explodeTNTSystem; 