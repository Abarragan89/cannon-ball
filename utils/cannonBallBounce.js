let debounceTimeout;

export default cannonBallBounce = async (gameData, isSoundOn, sounds, sound, headerStats, cannonBall, isVertical) => {
    // capture current ball bounce position to compare with last bounce position
    gameData.currentBounce = [cannonBall.position[0].toFixed(4), cannonBall.position[1].toFixed(4)]

    async function bounceBall() {
        // Check to see if sound option is on.
        if (isSoundOn > 0) {
            // only play sound if it is not already playing. 
            if (!sounds[sound].isPlaying) {
                try {
                    await sounds[sound].replayAsync();
                } catch (error) {
                    console.log('error in Cannon Ball Bounce ', error);
                }
            }
        }
        //  only bounce ball if game is not over and it did not hit the sand (hit bottom)
        if (!gameData.isGameOver && sound !== 'cannonBallHitSandSound') {
            headerStats.bounces += 1;
            gameData.lastBounce = gameData.currentBounce
        }
    }


    // compare the y position to see if it moved enough to consider a bounce and not a roll
    if (gameData?.lastBounce && Math.abs(gameData.currentBounce[1] - gameData.lastBounce[1]) > 1) {
        console.log('need to check last bounce')
        bounceBall();
    } else if (!gameData.lastBounce) {
        bounceBall();
    }

    cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical] * gameData.bounceLevel;


    // export default cannonBallBounce = (gameData, isSoundOn, sounds, sound, headerStats, cannonBall, isVertical) => {
    //     // Debounce the sound playback to prevent rapid successive calls
    //     clearTimeout(debounceTimeout);
    //     debounceTimeout = setTimeout(async () => {
    //         // Check to see if sound option is on.
    //         if (isSoundOn > 0) {
    //             // only play sound if it is not already playing. 
    //             if (!sounds[sound].isPlaying) {
    //                 try {
    //                     await sounds[sound].replayAsync();
    //                 } catch (error) {
    //                     console.log('error in Cannon Ball Bounce ', error);
    //                 }
    //             }
    //         }
    //         //  only bounce ball if game is not over and it did not hit the sand (hit bottom)
    //         if (!gameData.isGameOver && sound !== 'cannonBallHitSandSound') headerStats.bounces += 1;
    //     }, 100);

    //     cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical] * gameData.bounceLevel;

};