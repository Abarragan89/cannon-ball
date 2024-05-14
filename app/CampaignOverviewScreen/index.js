import { StyleSheet, View, ImageBackground, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import * as Progress from 'react-native-progress';
import Title from "../../Components/UI/Title";
import MainButton from "../../Components/UI/MainButton";
import BackArrow from "../../Components/UI/BackArrow";
import LockedMap from "../../Components/UI/LockedMap";
import lockedMapBg from '../../assets/images/lockedMap.png'
import colors from "../../constants/colors";
const mainBtnImgSrc = require('../../assets/images/btnWoodBg.png')
import InfoModal from "../../Components/UI/Modals/InfoModal";
import UserAllTimeNavStats from "../../Components/UI/UserAllTimeNavStats";
import { getTotalStarsInMap, getTotalStars } from "../../db/selectQueries";

const CampaignOverview = () => {

    const [showModal, setShowModal] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [totalStars, setTotalStars] = useState(0);
    const [starsNeededInModal, setStarsNeededInModal] = useState(0);
    // Map Progress Variables
    const [mapOneProgress, setMapOneProgress] = useState(0);
    const [mapTwoProgress, setMapTwoProgress] = useState(0);
    const [mapThreeProgress, setMapThreeProgress] = useState(0);
    const [mapFourProgress, setMapFourProgress] = useState(0);
    const [mapFiveProgress, setMapFiveProgress] = useState(0);

    function setStarsNeeded(starsNeeded) {
        setStarsNeededInModal(starsNeeded)
    }

    useEffect(() => {
        async function getUserData() {
            try {
                const basicProgress = await getTotalStarsInMap(1, 'Basics');
                const marksProgress = await getTotalStarsInMap(1, 'Marks');
                const hinderanceProgress = await getTotalStarsInMap(1, 'Hinderance');
                const krakenProgress = await getTotalStarsInMap(1, 'Kraken');
                const hatchProgress = await getTotalStarsInMap(1, 'Hatch');
                const totalStars = await getTotalStars(1);

                setMapOneProgress(basicProgress[0].totalMapStars);
                setMapTwoProgress(marksProgress[0].totalMapStars);
                setMapThreeProgress(hinderanceProgress[0].totalMapStars);
                setMapFourProgress(krakenProgress[0].totalMapStars);
                setMapFiveProgress(hatchProgress[0].totalMapStars);

                setTotalStars(totalStars[0].totalMapStars);
                setIsDataLoaded(true)

            } catch (error) {
                console.log('error getting map progress data ', error)
            }
        }
        getUserData();
    }, [])

    return (
        <>
            {showModal &&
                <InfoModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    starsNeeded={starsNeededInModal}
                />
            }
            <StatusBar hidden={true} />
            <>
                {isDataLoaded &&
                    <>
                        <View style={styles.backIcon}>
                            <BackArrow />
                        </View>
                        <UserAllTimeNavStats />
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
                                            progress={mapOneProgress / 15}
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
                                    {
                                        totalStars >= 7 ?
                                            <MainButton
                                                route="/LevelLobbyScreen"
                                                params={{
                                                    mapName: 'Marks',
                                                }}
                                                imgSrc={mainBtnImgSrc}
                                                progressBar={<Progress.Bar
                                                    progress={mapTwoProgress / 15}
                                                    width={100}
                                                    height={5}
                                                    style={[styles.slider]}
                                                    borderWidth={1}
                                                    borderColor={'#2c1717'}
                                                    color={'#00ff08'}
                                                />}
                                            >
                                                Marks
                                            </MainButton>
                                            :
                                            <LockedMap
                                                setShowModal={setShowModal}
                                                setStarsNeeded={() => setStarsNeeded(7)}
                                                imgSrc={lockedMapBg}
                                            />
                                    }
                                </View>
                                {/* Button Number Three */}
                                <View style={styles.mapBtnThree}>
                                    {totalStars >= 20 ?
                                        <MainButton
                                            route="/LevelLobbyScreen"
                                            params={{
                                                mapName: 'Hinderance',
                                            }}
                                            imgSrc={mainBtnImgSrc}

                                            progressBar={<Progress.Bar
                                                progress={mapThreeProgress / 15}
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
                                        :
                                        <LockedMap
                                            setShowModal={setShowModal}
                                            setStarsNeeded={() => setStarsNeeded(20)}
                                            imgSrc={lockedMapBg}
                                        />
                                    }
                                </View>
                                <View style={styles.mapBtnFour}>
                                    {totalStars >= 30 ?
                                        <MainButton
                                            route="/LevelLobbyScreen"
                                            params={{
                                                mapName: 'Kraken',
                                            }}
                                            imgSrc={mainBtnImgSrc}

                                            progressBar={<Progress.Bar
                                                progress={mapFourProgress / 15}
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
                                        :
                                        <LockedMap
                                            setShowModal={setShowModal}
                                            setStarsNeeded={() => setStarsNeeded(30)}
                                            imgSrc={lockedMapBg}
                                        />
                                    }
                                </View>
                                <View style={styles.mapBtnFive}>
                                    {
                                        totalStars >= 45 ?
                                            <MainButton
                                                route="/LevelLobbyScreen"
                                                params={{
                                                    mapName: 'Hatch',
                                                }}
                                                imgSrc={mainBtnImgSrc}

                                                progressBar={<Progress.Bar
                                                    progress={mapFiveProgress / 15}
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
                                            :
                                            <LockedMap
                                                setShowModal={setShowModal}
                                                setStarsNeeded={() => setStarsNeeded(45)}
                                                imgSrc={lockedMapBg}
                                            />
                                    }
                                </View>
                            </View>
                        </ImageBackground>
                    </>
                }
            </>
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
