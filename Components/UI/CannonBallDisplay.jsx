import { LinearGradient } from 'expo-linear-gradient';

const CannonBallDisplay = ({ color, gradientColor, size }) => {
    return (
        <LinearGradient
            // Background Linear Gradient
            // first color is the white shine
            colors={[gradientColor, color]}
            locations={[0.01, 0.75]}
            start={{ x: 0.1, y: 0.3 }}
            style={{
                borderColor: color,
                width: size,
                height: size,
                borderRadius: size
            }} ß
        />
    )
}

export default CannonBallDisplay;
