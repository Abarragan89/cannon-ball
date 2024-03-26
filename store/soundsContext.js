import React, { createContext, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
    const sounds = useRef({
        shootCannonSound: null,
        tntCannonBallHitSound: null,
        fireworkSound: null,
        tntExplosionSound: null,
        tntHandleClickSound: null,
        cannonBallBounceSound: null,
        cannonBallHitSandSound: null,
        backgroundWaveSound: null
    });

    useEffect(() => {
        const loadSound = async () => {
            try {
                console.log(' in the audio loading function ');
                const { sound: shootCannonSound } = await Audio.Sound.createAsync(require('../assets/sounds/cannonShot.mp3'));
                console.log(' loaded the first sound (1)');
                const { sound: tntExplosionSound } = await Audio.Sound.createAsync(require('../assets/sounds/hugeExplosion.wav'));
                console.log(' loaded the second sound (2)');
                const { sound: fireworkSound } = await Audio.Sound.createAsync(require('../assets/sounds/fireworks.wav'));
                console.log(' loaded the third sound (3)');
                const { sound: tntHandleClickSound } = await Audio.Sound.createAsync(require('../assets/sounds/tntHandleClick.wav'));
                console.log(' loaded the fourth sound (4)');
                const { sound: cannonBallBounceSound } = await Audio.Sound.createAsync(require('../assets/sounds/cannonBallBounce.wav'));
                console.log(' loaded the fifth sound (5)');
                const { sound: tntCannonBallHitSound } = await Audio.Sound.createAsync(require('../assets/sounds/woodHit.wav'));
                console.log(' loaded the sixth sound (6)');
                const { sound: cannonBallHitSandSound } = await Audio.Sound.createAsync(require('../assets/sounds/cannonBallHitsBottom.wav'));
                console.log(' loaded the seventh sound (7)');
                const { sound: backgroundWaveSound } = await Audio.Sound.createAsync(require('../assets/sounds/backgroundWaves.wav'), {
                    isLooping: true,
                    volume: 0.15
                });
                console.log(' loaded the seventh sound (7)');
                sounds.current  = {
                    shootCannonSound,
                    tntCannonBallHitSound,
                    fireworkSound,
                    tntExplosionSound,
                    tntHandleClickSound,
                    cannonBallBounceSound,
                    cannonBallHitSandSound,
                    backgroundWaveSound
                }
            } catch (e) {
                console.log('error loading music', e)
            }
        }

        loadSound();
    }, [])


    


    return (
        <SoundContext.Provider value={{ sounds }}>
            {children}
        </SoundContext.Provider>
    );
};


export { SoundContext, SoundProvider };
