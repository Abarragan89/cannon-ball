const followCannonBallOnMove = (entities, { touches }) => {

    touches.forEach(t => {
        if (t.type === 'move') {
            // console.log('moving in fold ', t.event);
            console.log('location X ', t.event.locationX)
            console.log('location Y ', t.event.locationY)


            entities.cannonBall.position[0] = t.event.locationX;
            entities.cannonBall.position[1] = t.event.locationY;
            calculateAccuracy();
        }

        function calculateAccuracy() {
            // coordinates for the bottom of the ball
            const ballXCoord = entities.cannonBall.position[0] + 10;
            const ballYCoord = entities.cannonBall.position[1] + 10;
    
            // coordinate for the top center of the TNT
            const tntXCoord = entities.TNT.position[0] + 15;
            const tntYCoord = entities.TNT.position[1] - 7;
    
            // calculate the length of both sides
            const triangleASide = Math.abs(ballXCoord - tntXCoord);
            const triangeBSide = Math.abs(ballYCoord - tntYCoord);
    
            const accuracyAmount = (Math.sqrt(triangleASide ** 2 + triangeBSide ** 2)).toFixed(2);
    
            if (accuracyAmount >= 15) {
                entities.cannonBall.accuracy =
                {
                    name: 'Good Shot',
                    float: accuracyAmount,
                    multiplier: 2,
    
                }
            } else if (accuracyAmount >= 5) {
                entities.cannonBall.accuracy =
                {
                    name: 'Great Shot!',
                    float: accuracyAmount,
                    multiplier: 3,
                }
            } else {
                entities.cannonBall.accuracy =
                {
                    name: 'Perfect Shot!!!',
                    float: accuracyAmount,
                    multiplier: 5,
                }
            }
            console.log('accuracy amount ', accuracyAmount)
            return accuracyAmount
        }
    })

    return entities;
}

export default followCannonBallOnMove;
