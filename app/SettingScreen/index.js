import {
    StyleSheet,
    View,
    Text,
    Switch,
    ImageBackground,
    StatusBar,
    ScrollView,
    Pressable
} from "react-native";
import { useState, useEffect } from 'react'
import BackArrow from "../../Components/UI/BackArrow";
import Title from "../../Components/UI/Title";
import colors from "../../constants/colors";
import Card from "../../Components/UI/Card";
import CannonBallDisplay from "../../Components/UI/CannonBallDisplay";
import { getUserDataPreferences, getUserCannonBalls } from "../../db/selectQueries";
import {
    updateUserMusicPref,
    updateUserSoundEfxPref,
    updateUserHapticsPref,
    updateUserCurrentCannonBall
} from "../../db/updateQueries";


const SettingScreen = () => {

    const [isMusicOn, setIsMusicOn] = useState(null);
    const [isSoundEfxOn, setIsSoundEfxOn] = useState(null);
    const [isHapticOn, setIsHapticOn] = useState(null);
    const [preferencesGathered, setPreferencesGathered] = useState(false);
    const [currentCannonBall, setCurrentCannonBall] = useState({});
    const [cannonBalls, setCannonBalls] = useState([]);

    async function handleMusicPref(value) {
        try {
            const intValue = value === true ? 1 : 0;
            await updateUserMusicPref(1, intValue)
        } catch (error) {
            console.log('error updating music preference ', error)
        }
        setIsMusicOn(value);
    }

    async function handleSoundEfxPref(value) {
        try {
            const intValue = value === true ? 1 : 0;
            await updateUserSoundEfxPref(1, intValue)
        } catch (error) {
            console.log('error updating soundEffects preference ', error)
        }
        setIsSoundEfxOn(value);
    }

    async function handleHapticsPref(value) {
        try {
            const intValue = value === true ? 1 : 0;
            await updateUserHapticsPref(1, intValue)
        } catch (error) {
            console.log('error updating Haptics preference ', error)
        }
        setIsHapticOn(value);
    };

    async function handleUpdateCurrentCannonBall(cannonBall) {
        try {
            await updateUserCurrentCannonBall(1, cannonBall.name);
            setCurrentCannonBall(cannonBall)
        } catch (error) {
            console.log('error updating current cannon ball ', error)
        }
    }

    // Get user preferences and purchased cannonBalls
    useEffect(() => {
        async function getUserPreferencesAndCannonBalls() {
            try {
                // only one item in the array so we can destructure
                const [userPref] = await getUserDataPreferences(1)
                setIsMusicOn(userPref.isSoundOn === 0 ? false : true);
                setIsSoundEfxOn(userPref.isSoundEffectsOn === 0 ? false : true);
                setIsHapticOn(userPref.isHapticsOn === 0 ? false : true)

                const cannonBalls = await getUserCannonBalls(1);
                setCannonBalls(cannonBalls.filter(cannonBall => cannonBall.isOwned === 1))
                const [currentBall] = cannonBalls.filter(cannonBall => cannonBall.name === userPref.currentCannonBallName)
                setCurrentCannonBall(currentBall)

                setPreferencesGathered(true);
            } catch (error) {
                console.log('error getting user pref in settings ', error)
            }
        }
        getUserPreferencesAndCannonBalls();
    }, [])

    return (
        <>
            {preferencesGathered && currentCannonBall &&
                <ImageBackground
                    source={require('../../assets/images/screenWoodBg.png')}
                    style={styles.rootContainer}
                >
                    <StatusBar barStyle='light-content' />
                    <View style={styles.backIcon}>
                        <BackArrow />
                    </View>
                    <Title color={colors.offWhite} size={45}>Settings</Title>
                    <View style={styles.cardContainer}>
                        {/* Music Card */}
                        <Card
                            title={'Sounds'}
                        >
                            <View style={styles.labelAndInputRow}>
                                <Text style={styles.label}>Music:</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: colors.sandColorAccent }}
                                    thumbColor={isMusicOn ? colors.goldStar : colors.offWhite}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={(value) => handleMusicPref(value)}
                                    value={isMusicOn}
                                />
                            </View>
                            <View style={styles.labelAndInputRow}>
                                <Text style={styles.label}>Sound Effects:</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: colors.sandColorAccent }}
                                    thumbColor={isSoundEfxOn ? colors.goldStar : colors.offWhite}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={(value) => handleSoundEfxPref(value)}
                                    value={isSoundEfxOn}
                                />
                            </View>
                            <View style={styles.labelAndInputRow}>
                                <Text style={styles.label}>Haptics:</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: colors.sandColorAccent }}
                                    thumbColor={isHapticOn ? colors.goldStar : colors.offWhite}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={(value) => handleHapticsPref(value)}
                                    value={isHapticOn}
                                />
                            </View>
                        </Card>
                        {/* Cannon Ball Card */}
                        <Card
                            title={'Cannon Ball'}
                        >
                            <View style={styles.cannonOptionRootContainer}>
                                <CannonBallDisplay
                                    color={currentCannonBall.color}
                                    gradientColor={currentCannonBall.gradientColor}
                                    size={55}
                                    isOwned={currentCannonBall.isOwned}
                                    isEquipped={true}
                                />
                                <ScrollView horizontal={true}>
                                    <View style={styles.possibleCannonOptions}>
                                        {cannonBalls.map((cannonBall, index) =>
                                            <Pressable key={index} onPress={() => handleUpdateCurrentCannonBall(cannonBall)}>
                                                {/* <View style={[styles.cannonBallContainer, styles.possibleCannonBallContainer]}> */}
                                                <CannonBallDisplay
                                                    color={cannonBall.color}
                                                    gradientColor={cannonBall.gradientColor}
                                                    size={40}
                                                    isOwned={cannonBall.isOwned}
                                                />
                                                {/* </View> */}
                                            </Pressable>
                                        )}
                                    </View>
                                </ScrollView>
                            </View>
                        </Card>
                    </View>
                </ImageBackground>
            }
        </>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    rootContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 15
    },
    backIcon: {
        zIndex: 2
    },
    cardContainer: {
        marginTop: 5,
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    labelAndInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        marginBottom: 20,
        fontFamily: 'textFont',
        fontSize: 23,
        color: colors.offWhite
    },
    cannonOptionRootContainer: {
        alignItems: 'center',
    },
    cannonBallContainer: {
        alignItems: 'center',
        borderWidth: 1,
        width: 60,
        borderColor: colors.primaryBlack,
        borderRadius: 8,
        padding: 5
    },
    possibleCannonOptions: {
        marginTop: 10,
        flexDirection: 'row',
    },
    possibleCannonBallContainer: {
        margin: 10,
    },
    image: {
        width: 50,
        height: 50,
    },
})
