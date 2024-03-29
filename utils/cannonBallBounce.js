export default cannonBallBounce = (sounds, sound, headerStats, cannonBall, isVertical) => {
    sounds[sound].replayAsync();
    headerStats.bounces += 1;
    cannonBall.velocity[isVertical] = -cannonBall.velocity[isVertical]
};