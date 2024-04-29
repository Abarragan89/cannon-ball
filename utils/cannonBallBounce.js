export default cannonBallBounce = (sounds, sound, headerStats, cannonBall, isVertical) => {
    try {
        sounds[sound].replayAsync();
    } catch (error) {
        console.log('error in Cannon Ball Bounce ', error)
    }
    headerStats.bounces += 1;
    cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical]
};