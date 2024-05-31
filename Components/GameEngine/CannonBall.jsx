import { LinearGradient } from 'expo-linear-gradient';
import SpecialCannonBall from './SpecialCannonBalls';

function CannonBall({ position, display, color, gradientColor, cannonBallRadius }) {
    const x = position[0];
    const y = position[1];

    return (
        <>
            {gradientColor.startsWith('#') ?
                <LinearGradient
                    colors={[gradientColor, color]}
                    locations={[0.01, 0.75]}
                    start={{ x: 0.1, y: 0.3 }}
                    style={{
                        left: x,
                        top: y,
                        display: display,
                        borderColor: '#3b3b3ba0',
                        borderWidth: 0.5,
                        zIndex: 0,
                        position: 'absolute',
                        borderRadius: cannonBallRadius * 2,
                        width: cannonBallRadius * 2,
                        height: cannonBallRadius * 2,
                    }}
                />
                :
                <SpecialCannonBall 
                    position={position}
                    display={display}
                    gradientColor={gradientColor}
                    cannonBallRadius={cannonBallRadius}
                />
            }
        </>
    )
}

export default CannonBall;