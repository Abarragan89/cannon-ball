import { StyleSheet, View, Text, Switch, ImageBackground, StatusBar } from "react-native";
import { useState } from 'react'
import BackArrow from "../../Components/UI/BackArrow";
import Title from "../../Components/UI/Title";
import colors from "../../constants/colors";
import Card from "../../Components/UI/Card";

const SettingScreen = () => {

    const [isMusicOn, setIsMusicOn] = useState(false);
    const [isSoundEfxOn, setIsSoundEfxOn] = useState(false);
    const [isHapticOn, setIsHapticOn] = useState(false);


    return (
        <ImageBackground
            source={require('../../assets/images/screenWoodBg.png')}
            style={styles.rootContainer}
            >
            <StatusBar barStyle='light-content'/>
            <View style={styles.backIcon}>
                <BackArrow />
            </View>
            <Title color={colors.offWhite} size={45}>Settings</Title>
            <View style={styles.cardContainer}>
                {/* Music Card */}
                <Card>
                    <View style={styles.soundOptionView}>
                        <View style={styles.labelAndInputRow}>
                            <Text style={styles.label}>Music:</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.sandColorAccent }}
                                thumbColor={isMusicOn ? colors.goldStar : colors.offWhite}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsMusicOn(prev => !prev)}
                                value={isMusicOn}
                            />
                        </View>
                        <View style={styles.labelAndInputRow}>
                            <Text style={styles.label}>Sound Effects:</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.sandColorAccent }}
                                thumbColor={isSoundEfxOn ? colors.goldStar : colors.offWhite}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsSoundEfxOn(prev => !prev)}
                                value={isSoundEfxOn}
                            />
                        </View>
                        <View style={styles.labelAndInputRow}>
                            <Text style={styles.label}>Haptics:</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.sandColorAccent }}
                                thumbColor={isHapticOn ? colors.goldStar : colors.offWhite}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsHapticOn(prev => !prev)}
                                value={isHapticOn}
                            />
                        </View>
                    </View>
                </Card>
            </View>
        </ImageBackground>
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
        marginTop: 25,
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    textInput: {
        fontFamily: 'textFont',
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 15,
        textAlign: 'center',
        fontSize: 20

    },
    textInputFocused: {
        backgroundColor: colors.offWhite,
        color: colors.primaryBlack
    },
    textInputBlurred: {
        backgroundColor: colors.skyColor,
        color: colors.offWhite
    },
    labelAndInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    usernameRow: {
        alignItems: 'center'
    },
    label: {
        marginBottom: 20,
        fontFamily: 'textFont',
        fontSize: 23,
        color: colors.offWhite
    },
    text: {

    }
})
