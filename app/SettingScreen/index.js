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
import { getUserDataPreferences } from "../../utils/db/selectQueries";
import {
    updateUserMusicPref,
    updateUserSoundEfxPref,
    updateUserHapticsPref
} from "../../utils/db/updateQueries";


const SettingScreen = () => {

    const [isMusicOn, setIsMusicOn] = useState(null);
    const [isSoundEfxOn, setIsSoundEfxOn] = useState(null);
    const [isHapticOn, setIsHapticOn] = useState(null);
    const [preferencesGathered, setPreferencesGathered] = useState(false);
    const [currentCannonBall, setCurrentCannonBall] = useState({ gradientColor: 'white', color: 'black' });
    const imageArray = ['red', 'orange', 'yellow', 'green', 'purple'];


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
    }

    // Get user preferences
    useEffect(() => {
        async function getUserPreferences() {
            try {
                // only one item in the array so we can destructure
                const [userPref] = await getUserDataPreferences(1)
                setIsMusicOn(userPref.isSoundOn === 0 ? false : true);
                setIsSoundEfxOn(userPref.isSoundEffectsOn === 0 ? false : true);
                setIsHapticOn(userPref.isHapticsOn === 0 ? false : true)
                setPreferencesGathered(true);
            } catch (error) {
                console.log('error getting user pref in settings ', error)
            }
        }
        getUserPreferences();
    }, [])


    return (
        <>
            {preferencesGathered &&
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
                                <View style={[styles.cannonBallContainer, styles.currentCannonBall]}>
                                    <CannonBallDisplay
                                        color={currentCannonBall.color}
                                        gradientColor={currentCannonBall.gradientColor}
                                        size={45}
                                    />
                                </View>
                                <ScrollView horizontal={true}>
                                    <View style={styles.possibleCannonOptions}>
                                        {imageArray.map((img, index) =>
                                            <Pressable key={index} onPress={() => setCurrentCannonBall({ color: img, gradientColor: 'white' })}>
                                                <View style={[styles.cannonBallContainer, styles.possibleCannonBallContainer]}>
                                                    <CannonBallDisplay
                                                        color={img}
                                                        gradientColor={'white'}
                                                        size={35}
                                                    />
                                                </View>
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
        flex: 1,
        paddingTop: 10
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
    currentCannonBall: {
        borderColor: colors.goldStar,
        borderWidth: 2
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
