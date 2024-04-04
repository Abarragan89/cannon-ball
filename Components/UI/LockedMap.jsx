import { StyleSheet, Text, ImageBackground } from 'react-native';
import colors from '../../constants/colors';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';



const LockedMap = ({ starsNeeded, imgSrc }) => {
    return (
        <>
            <ImageBackground
                style={[
                    styles.backgroundImage
                ]}
                source={imgSrc}
            >
                <Entypo name="lock" size={23} color="#afabab" />
                <Text style={[styles.text]}>{starsNeeded}
                    {' '}
                    <Fontisto style={styles.star} name="star" size={15} color={'gold'} />
                    's
                </Text>
            </ImageBackground>
        </>
    )
}

export default LockedMap;

const styles = StyleSheet.create({
    backgroundImage: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 154,
        height: 47,
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        marginHorizontal: 5,
        fontFamily: 'textFont',
        color: colors.offWhite,
        textAlign: 'center'
    },
    star: {
        marginRight: 5
    },
    pressed: {
        elevation: 0,
        borderTopWidth: 0,
        borderRadius: 2,
        borderBottomWidth: 2,
        transform: [{ translateY: 1 }]
    }
})
