
let debounceTimeout;
export default cannonBallBounce = async (gameData, isSoundOn, sounds, sound, headerStats, cannonBall, isVertical, hinderanceName = 'None') => {
    async function bounceSoundAndScore() { 
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
    }
    // only add a delay if it is hitting the same
    if (gameData.lastHinderanceHit === hinderanceName) {
        gameData.lastHinderanceHit = hinderanceName
        cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical] * gameData.bounceLevel;
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(bounceSoundAndScore, 150);
        return;
    }
    
    if (hinderanceName === 'rightWall' || hinderanceName === 'leftWall' || hinderanceName === 'sandWall') {
        cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical] * gameData.bounceLevel;
        bounceSoundAndScore();
        return;
    }

    if (gameData.lastHinderanceHit !== hinderanceName) {
        gameData.lastHinderanceHit = hinderanceName
        cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical] * gameData.bounceLevel;
        bounceSoundAndScore();
        return;
    }
    // Debounce the sound playback to prevent rapid successive calls

};