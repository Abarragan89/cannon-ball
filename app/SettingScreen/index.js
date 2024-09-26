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
import { getUserDataPreferences } from "../../db/selectQueries";
import {
    updateUserMusicPref,
    updateUserSoundEfxPref,
    updateUserHapticsPref,
} from "../../db/updateQueries";


const SettingScreen = () => {

    const [isMusicOn, setIsMusicOn] = useState(null);
    const [isSoundEfxOn, setIsSoundEfxOn] = useState(null);
    const [isHapticOn, setIsHapticOn] = useState(null);
    const [preferencesGathered, setPreferencesGathered] = useState(false);

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

    // Get user preferences and purchased cannonBalls
    useEffect(() => {
        async function getUserPreferencesAndCannonBalls() {
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
        getUserPreferencesAndCannonBalls();
    }, [])

    return (
        <>
            {preferencesGathered &&
                <ImageBackground
                    source={require('../../assets/images/screenWoodBg.png')}
                    style={styles.rootContainer}
                >
                    <StatusBar hidden={true} />
                    <View style={styles.backIcon}>
                        <BackArrow color='white' />
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
        paddingTop: 5
    },
    backIcon: {
        zIndex: 2
    },
    cardContainer: {
        alignItems: 'center'
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
})
