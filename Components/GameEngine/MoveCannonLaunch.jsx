import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

// they can manipulate themselves by grabbing themselves as entities
const MoveCannonLaunch = (entity) => {

    function sliderChangeHandler(event) {
        entity.position[0] = event
    }
    return (
        <View style={styles.root}>
                <Slider
                    style={{ width: 670, height: 30 }}
                    onValueChange={sliderChangeHandler}
                    maximumValue={640}
                    value={0}
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
        top: 60,
        zIndex: 10,
        left: -9
    }
})
