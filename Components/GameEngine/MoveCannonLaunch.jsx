import { View, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';

// they can manipulate themselves by grabbing themselves as entities
const MoveCannonLaunch = (entities) => {

    function sliderChangeHandler(event) {
        entities.position[0] = event
    }
    
    return (
        <View style={styles.root}>
            <Slider
                style={{ width: 670, height: 20}}
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
        left: -9
    }
})
