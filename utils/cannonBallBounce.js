let debounceTimeout;

export default cannonBallBounce = (gameData, isSoundOn, sounds, sound, headerStats, cannonBall, isVertical) => {
    // Debounce the sound playback to prevent rapid successive calls
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
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
        if (!gameData.isGameOver && sound !== 'cannonBallHitSandSound') headerStats.bounces += 1;
    }, 100);
    
    cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical] * gameData.bounceLevel;

};