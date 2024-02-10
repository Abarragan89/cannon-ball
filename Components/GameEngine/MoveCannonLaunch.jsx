import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

// they can manipulate themselves by grabbing themselves as entities
const MoveCannonLaunch = ({ position, setPosition, updatePositionRef }) => {

    function sliderChangeHandler(event) {
    //    position[0] = event
        updatePositionRef.current = [event, updatePositionRef.current[0]]
       setPosition(prev => [event, prev[1]])
    }
    return (
        <View style={styles.root}>
        <Slider
                    style={{ width: 670, height: 30 }}
                    onValueChange={sliderChangeHandler}
                    maximumValue={640}
                    value={position[0]}
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbTintColor='transparent'
                />
        </View>
    )
}

export default MoveCannonLaunch;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 240,
        zIndex: 10,
        left: -9
    }
})
