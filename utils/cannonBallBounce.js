export default cannonBallBounce = (gameData, isSoundOn, sounds, sound, headerStats, cannonBall, isVertical) => {
    if (isSoundOn > 0) {
        try {
            sounds[sound].replayAsync();
        } catch (error) {
            console.log('error in Cannon Ball Bounce ', error)
        }
    }
    headerStats.bounces += 1;
    cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical] * gameData.bounceLevel
};