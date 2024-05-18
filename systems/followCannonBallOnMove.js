const followCannonBallOnMove = (entities, { touches }) => {

    touches.forEach(t => {
        if (t.type === 'move') {
            entities.cannonBall.position[0] = t.event.locationX - 150;
            entities.cannonBall.position[1] = t.event.locationY - 150;
            calculateAccuracy();
        }

        function calculateAccuracy() {
            // coordinates for the bottom of the ball
            const ballXCoord = entities.cannonBall.position[0] + +entities.cannonBall.cannonBallRadius;
            const ballYCoord = entities.cannonBall.position[1] + +entities.cannonBall.cannonBallRadius * 2;

            // coordinate for the top center of the TNT
            const tntXCoord = entities.TNT.position[0] + 15;
            const tntYCoord = entities.TNT.position[1] - 5;

            // calculate the length of both sides
            const triangleASide = Math.abs(ballXCoord - tntXCoord);
            const triangeBSide = Math.abs(ballYCoord - tntYCoord);

            const accuracyAmount = (Math.sqrt(triangleASide ** 2 + triangeBSide ** 2)).toFixed(2);
            console.log('accuracy amount ', accuracyAmount)
        }
    })

    return entities;
}

export default followCannonBallOnMove;
