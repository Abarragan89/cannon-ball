import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../constants/colors';
import ModalBtn from '../UI/ModalBtn';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;



const GameTutorial = ({ tutorialStep, increaseTutorialStep }) => {

    // Create the variable to hold the value of animation
    const translateX = useRef(new Animated.Value(-50)).current;
    const translateY = useRef(new Animated.Value(-20)).current;
    const translateXSecond = useRef(new Animated.Value(0)).current;
    const [triggerUseEffect, setTriggerUseEffect] = useState(false)

    const aimingAnimationRef = useRef();
    const powerAnimationRef = useRef();
    const moveCannonAnimationRef = useRef();

    // Create the first animation to show user how to aim
    const aimingAnimation = () => {
        aimingAnimationRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 50,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -50,
                    duration: 2000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }

    // Create the second animation to show user how to increase power
    const powerAnimation = () => {
        powerAnimationRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -100,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -20,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }

    // Create the first animation to show user how to aim
    const moveCannonAnimation = () => {
        moveCannonAnimationRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(translateXSecond, {
                    toValue: -30,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateXSecond, {
                    toValue: 20,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }

    const stopAllAnimations = () => {
        if (aimingAnimationRef.current) aimingAnimationRef.current.stop();
        if (powerAnimationRef.current) powerAnimationRef.current.stop();
        if (moveCannonAnimationRef.current) moveCannonAnimationRef.current.stop();
    }

    useEffect(() => {

        if (tutorialStep === 0) {
            aimingAnimation();
        };
        if (tutorialStep === 1) {
            stopAllAnimations();
            powerAnimation();
        };
        if (tutorialStep === 2) {
            stopAllAnimations();
            moveCannonAnimation();
        };
        if (tutorialStep === 3) {
            stopAllAnimations();
        };

        return () => {
            stopAllAnimations();
        }
    },
        [
            translateX,
            translateY,
            tutorialStep,
            aimingAnimation.current,
            powerAnimation.current,
            moveCannonAnimation.current,
        ]);

    return (
        <View style={styles.rootContainer}>
            <View style={styles.textIconContainer}>
                {
                    tutorialStep === 0 &&
                    <>
                        <Animated.View style={{ transform: [{ translateX }] }}>
                            <FontAwesome
                                name="hand-pointer-o"
                                size={80}
                                color={colors.offWhite}
                            />
                        </Animated.View>
                        <Text style={styles.tutorialText}>Adjust angle</Text>
                        <ModalBtn
                            text='Next'
                            handler={increaseTutorialStep}
                        />
                    </>
                }
                {
                    tutorialStep === 1 &&
                    <>
                        <Animated.View style={{ transform: [{ translateY }] }}>
                            <FontAwesome
                                name="hand-pointer-o"
                                size={80}
                                color={colors.offWhite}
                            />
                        </Animated.View>
                        <Text style={styles.tutorialText}>Adjust power</Text>
                        <ModalBtn
                            text='Next'
                            handler={increaseTutorialStep}
                        />
                    </>
                }
                {
                    tutorialStep === 2 &&
                    <>
                        <Text style={styles.tutorialText}>Drag to move</Text>
                        <Animated.View style={[{
                            position: 'absolute',
                            top: screenHeight - 250,
                            transform: [{ translateX: translateXSecond }]
                        }]}>
                            <FontAwesome
                                name="hand-pointer-o"
                                size={80}
                                color={colors.offWhite}
                            />
                        </Animated.View>
                        <ModalBtn
                            text='Next'
                            handler={increaseTutorialStep}
                        />
                    </>
                }
                {
                    tutorialStep === 3 &&
                    <>
                        <Text style={styles.tutorialText}>Fire!</Text>
                        <Animated.View style={[styles.fireCannonPointer, { transform: [{ translateX: translateXSecond }] }]}>
                            <FontAwesome
                                name="hand-pointer-o"
                                size={80}
                                color={colors.offWhite}
                            />
                        </Animated.View>
                        <ModalBtn
                            text={`Let's Play`}
                            handler={increaseTutorialStep}
                        />
                    </>
                }
            </View>
        </View>
    )
}

export default GameTutorial;

const styles = StyleSheet.create({
    rootContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000075',
    },
    textIconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tutorialText: {
        fontFamily: 'textFont',
        color: colors.offWhite,
        fontSize: 20
    },
    moveCannonPointer: {
        position: 'absolute',
        bottom: -170
    },
    fireCannonPointer: {
        position: 'absolute',
        right: 10,
        bottom: -170
    }
})
