let debounceTimeout;


export default cannonBallBounce = (gameData, isSoundOn, sounds, sound, headerStats, cannonBall, isVertical) => {
    // Check to see if sound option is on.
    if (isSoundOn > 0) {
        // Debounce the sound playback to prevent rapid successive calls
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            // only play sound if it is not already playing. 
            if (!sounds[sound].isPlaying) {
                try {
                    await sounds[sound].replayAsync();
                    //  only bounce ball if game is not over and it makes a sound
                    if (!gameData.isGameOver) headerStats.bounces += 1;
                } catch (error) {
                    console.log('error in Cannon Ball Bounce ', error);
                }
            }
        }, 100); // Adjust the debounce delay as needed
    }

    cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical] * gameData.bounceLevel;
};