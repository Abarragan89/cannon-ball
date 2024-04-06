import { StyleSheet, View, ImageBackground } from "react-native";
import { useState } from "react";
import * as Progress from 'react-native-progress';
import Title from "../../Components/UI/Title";
import MainButton from "../../Components/UI/MainButton";
import BackArrow from "../../Components/UI/BackArrow";
import LockedMap from "../../Components/UI/LockedMap";
import lockedMapBg from '../../assets/images/lockedMap.png'
import colors from "../../constants/colors";
const mainBtnImgSrc = require('../../assets/images/btnWoodBg.png')
import InfoModal from "../../Components/UI/InfoModal";

const CampaignOverview = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal &&
                <InfoModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    starsNeeded={28}
                />
            }

            <View style={styles.backIcon}>
                <BackArrow />
            </View>
            <ImageBackground
                source={require('../../assets/images/treasureMapBg.png')}
                style={[
                    !mainBtnImgSrc ? { display: 'none' } : {},
                    styles.rootContainer
                ]}>
                <View style={styles.headerRoot}>
                    <Title color={colors.offWhite} size={50}>Campaign</Title>
                </View>
                <View style={styles.mapBtnContainer}>
                    <View style={styles.mapBtnOne}>
                        <MainButton
                            route="/LevelLobbyScreen"
                            params={{
                                mapName: 'Basics',
                            }}
                            imgSrc={mainBtnImgSrc}

                            progressBar={<Progress.Bar
                                progress={14 / 15}
                                width={100}
                                height={5}
                                style={[styles.slider]}
                                borderWidth={1}
                                borderColor={'#2c1717'}
                                color={'#00ff08'}
                            />}
                        >Basics
                        </MainButton>
                    </View>
                    <View style={styles.mapBtnTwo}>
                        {/* <MainButton
                            route="/LevelLobbyScreen"
                            params={{
                                mapName: 'Marks',
                            }}
                            imgSrc={mainBtnImgSrc}

                            progressBar={<Progress.Bar
                                progress={14 / 15}
                                width={100}
                                height={5}
                                style={[styles.slider]}
                                borderWidth={1}
                                borderColor={'#2c1717'}
                                color={'#00ff08'}
                            />}
                        >
                            Marks
                        </MainButton> */}
                        <LockedMap
                            showModal={showModal}
                            setShowModal={setShowModal}
                            starsNeeded={29}
                            imgSrc={lockedMapBg}
                        />
                    </View>
                    <View style={styles.mapBtnThree}>
                        <MainButton
                            route="/LevelLobbyScreen"
                            params={{
                                mapName: 'Hinderance',
                            }}
                            imgSrc={mainBtnImgSrc}

                            progressBar={<Progress.Bar
                                progress={14 / 15}
                                width={100}
                                height={5}
                                style={[styles.slider]}
                                borderWidth={1}
                                borderColor={'#2c1717'}
                                color={'#00ff08'}
                            />}
                        >
                            Hinderance
                        </MainButton>
                    </View>
                    <View style={styles.mapBtnFour}>
                        <MainButton
                            route="/LevelLobbyScreen"
                            params={{
                                mapName: 'Kraken',
                            }}
                            imgSrc={mainBtnImgSrc}

                            progressBar={<Progress.Bar
                                progress={14 / 15}
                                width={100}
                                height={5}
                                style={[styles.slider]}
                                borderWidth={1}
                                borderColor={'#2c1717'}
                                color={'#00ff08'}
                            />}
                        >
                            Kraken
                        </MainButton>
                    </View>
                    <View style={styles.mapBtnFive}>
                        <MainButton
                            route="/LevelLobbyScreen"
                            params={{
                                mapName: 'Hatch',
                            }}
                            imgSrc={mainBtnImgSrc}

                            progressBar={<Progress.Bar
                                progress={14 / 15}
                                width={100}
                                height={5}
                                style={[styles.slider]}
                                borderWidth={1}
                                borderColor={'#2c1717'}
                                color={'#00ff08'}
                            />}
                        >
                            Hatch
                        </MainButton>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default CampaignOverview;

const styles = StyleSheet.create({
    backIcon: {
        zIndex: 2
    },
    rootContainer: {
        position: 'absolute',
        paddingTop: 10,
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    },
    headerRoot: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        zIndex: 1
    },
    mapBtnContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    slider: {
        backgroundColor: '#4e2a2a'
    },
    mapBtnOne: {
        position: 'absolute',
        top: -40,
        left: 120,
    },
    mapBtnTwo: {
        position: 'absolute',
        left: 420,
        top: -10,
    },
    mapBtnThree: {
        position: 'absolute',
        top: 100,
        right: 0
    },
    mapBtnFour: {
        position: 'absolute',
        top: 140,
        right: 330
    },
    mapBtnFive: {
        position: 'absolute',
        top: 110,
        left: 40,
    }

})
