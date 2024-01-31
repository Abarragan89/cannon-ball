import { View, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width

// they can manipulate themselves by grabbing themselves as entities
const MoveCannonLaunch = (entities) => {

    function sliderChangeHandler(event) {
        entities.position[0] = event
    }

    return (
        <View style={styles.root}>
            <Slider
                style={{ width: screenWidth - 127 }}
                minimumValue={-20}
                onValueChange={sliderChangeHandler}
                maximumValue={screenWidth - 180}
                upperLimit={screenWidth}
                value={entities.position[0]}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbTintColor='#0991bf'
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
        top: 70
    }
})
