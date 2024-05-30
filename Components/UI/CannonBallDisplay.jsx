import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../constants/colors';
import { useEffect, useState } from 'react';
import SpecialCannonBallDisplay from './SpecialCannonBallDisplay';

const CannonBallDisplay = ({ color, gradientColor, size, isOwned, isEquipped, name }) => {

    const [adjustedCannonBallSize, setAdjustedCannonBallSize] = useState(null);
    const [adjustedContainerSize, setAdjustedContainerSize] = useState(null);

    useEffect(() => {
        switch (size) {
            case 4:
                setAdjustedCannonBallSize(8);
                setAdjustedContainerSize(60);
                break;
            case 6:
                setAdjustedCannonBallSize(20);
                setAdjustedContainerSize(60);
                break;
            case 8:
                setAdjustedCannonBallSize(30);
                setAdjustedContainerSize(60);
                break;
            case 11:
                setAdjustedCannonBallSize(40);
                setAdjustedContainerSize(60);
                break;
            case 13:
                setAdjustedCannonBallSize(45);
                setAdjustedContainerSize(60);
                break;
            default:
                setAdjustedCannonBallSize(size);
                setAdjustedContainerSize(85);
                break;
        }
    }, [])

    return (
        <View>
            <View style={[
                styles.cannonBallContainer,
                {
                    height: adjustedContainerSize,
                    width: adjustedContainerSize
                },
                isOwned && { backgroundColor: colors.offWhite },
                isEquipped && {
                    borderColor: colors.limeGreen,
                    borderWidth: 3,
                    borderRadius: 8,
                }
            ]}>
                {!isOwned &&
                    <View style={[styles.lockedOverlay]} />
                }
                {/* Render the special balls if no gradient hexidecimal */}
                {gradientColor.startsWith('#') ?
                    <LinearGradient
                        colors={[gradientColor, color]}
                        locations={[0.01, 0.75]}
                        start={{ x: 0.1, y: 0.3 }}
                        style={{
                            borderColor: '#3b3b3ba0',
                            borderWidth: .5,
                            width: adjustedCannonBallSize,
                            height: adjustedCannonBallSize,
                            borderRadius: adjustedCannonBallSize,
                        }}
                    />
                    :
                    <SpecialCannonBallDisplay
                        gradientColor={gradientColor}
                        adjustedCannonBallSize={adjustedCannonBallSize}
                        size={size}
                    />

                }
            </View>
            <Text style={styles.cannonBallNameText}>{name}</Text>
        </View >
    )
}

export default CannonBallDisplay;

const styles = StyleSheet.create({
    lockedOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 7,
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000072',
    },
    cannonBallContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.primaryBlack,
        borderRadius: 8,
        padding: 8,
        marginHorizontal: 10,
        width: 65,
        height: 65
    },
    cannonBallNameText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'textFont',
        fontSize: 16,
        paddingBottom: 10
    },
})
