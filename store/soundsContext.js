import React, { createContext, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
    const sounds = useRef({
        shootCannonSound: null,
        tntCannonBallHitSound: null,
        backgrounMusicSound: null,
        tntExplosionSound: null,
        tntHandleClickSound: null,
        cannonBallBounceSound: null,
        cannonBallHitSandSound: null,
        backgroundWaveSound: null
    });

    const images = useRef({
        homescreenBgImage: null
    })

    useEffect(() => {
        const loadSound = async () => {
            try {
                //  DOWNLOAD ALL AUDIO FILES
                console.log(' in the audio loading function ');
                const { sound: shootCannonSound } = await Audio.Sound.createAsync(require('../assets/sounds/cannonShot.mp3'));
                const { sound: tntExplosionSound } = await Audio.Sound.createAsync(require('../assets/sounds/hugeExplosion.wav'));
                const { sound: backgroundMusicSound } = await Audio.Sound.createAsync(require('../assets/sounds/backgroundMusic.mp3'), {
                    volume: 0.1
                });
                const { sound: tntHandleClickSound } = await Audio.Sound.createAsync(require('../assets/sounds/tntHandleClick.wav'));
                const { sound: cannonBallBounceSound } = await Audio.Sound.createAsync(require('../assets/sounds/cannonBallBounce.wav'));
                const { sound: tntCannonBallHitSound } = await Audio.Sound.createAsync(require('../assets/sounds/woodHit.wav'));
                const { sound: cannonBallHitSandSound } = await Audio.Sound.createAsync(require('../assets/sounds/cannonBallHitsBottom.wav'));
                const { sound: backgroundWaveSound } = await Audio.Sound.createAsync(require('../assets/sounds/backgroundWaves.wav'), {
                    volume: 0.1
                });
                // SET AUDIO FILES IN REF VARIABLES
                sounds.current = {
                    shootCannonSound,
                    tntCannonBallHitSound,
                    tntExplosionSound,
                    backgroundMusicSound,
                    tntHandleClickSound,
                    cannonBallBounceSound,
                    cannonBallHitSandSound,
                    backgroundWaveSound
                }
                // // DOWNLOAD ALL IMAGE FILES
                // const homescreenBgImage = require('../assets/homeScreenImg.png')
                // // SET IMAGE FILES IN REF VARIABLES
                // images.current = {
                //     homescreenBgImage,
                // }
            } catch (e) {
                console.log('ERROR LOADING IMAGES AND AUDIO FILES ', e)
            }
        }
        
        loadSound();
    }, [])





    return (
        <SoundContext.Provider value={{ sounds, images }}>
            {children}
        </SoundContext.Provider>
    );
};


export { SoundContext, SoundProvider };
