const explodeTNTSystem = (entities) => {
    // Variables to determine collision of Cannon Ball and Top of TNT
    // the X1 adn X2 lines are slightly within the TNT box. It needs to appear
    // as if it is hitting the handle. Therefore, i added 5 to the first X1 and
    // did not all the total 30 px length (only added 25)
    const lineX1 = entities.TNT.position[0] + 3;
    const lineY1 = entities.TNT.position[1] - 0;
    const lineX2 = entities.TNT.position[0] + 27;
    const lineY2 = entities.TNT.position[1] - 0;
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
        entities.TNT.handlePosition[0] = -6;
        // make cannonball go flying
        entities.cannonBall.velocity[1] = entities.cannonBall.velocity[1] * 0.0000001
        entities.cannonBall.velocity[0] = entities.cannonBall.velocity[0] * 0.0000001
        // trigger explosion animation
        // make tnt box disappear
        
        // make ball go flying after 1 second pause before explosion
        setTimeout(() => {
            entities.cannonBall.velocity[1] = -4;
            entities.cannonBall.velocity[0] = 4;
            entities.explosion.startAnimation = true;
            entities.TNT.display = 'none';
        }, 500)
    }
    return entities;

}

export default explodeTNTSystem; 