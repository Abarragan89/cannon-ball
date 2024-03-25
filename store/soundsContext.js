import React, { createContext, useState } from 'react';
import { Audio } from 'expo-av';

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
    const [sound, setSound] = useState(null);

    const [shootCannonSound, setShootCannonSound] = useState();
    const [fireworkSound, setFireworkSound] = useState();
    const [tntExplosionSound, setTntExplosionSound] = useState();
    const [tntHandleClickSound, setTntHandleClickSound] = useState();
    const [cannonBallBounceSound, setCannonBallBounceSound] = useState();
    const [tntCannonBallHitSound, setTntCannonBallHitSound] = useState();
    const [cannonBallHitSandSound, setCannonBallHitSandSound] = useState();
    const [backgroundWaveSound, setBackgroundWaveSound] = useState();

    const loadSound = async () => {
        try {

            try {
                console.log(' in the audio loading function ');
                const { sound: cannonShot } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonShot.mp3'));
                console.log(' loaded the first sound (1)');
                const { sound: explosion } = await Audio.Sound.createAsync(require('../../../../assets/sounds/hugeExplosion.wav'));
                console.log(' loaded the second sound (2)');
                const { sound: fireworks } = await Audio.Sound.createAsync(require('../../../../assets/sounds/fireworks.wav'));
                console.log(' loaded the third sound (3)');
                const { sound: tntHandleClick } = await Audio.Sound.createAsync(require('../../../../assets/sounds/tntHandleClick.wav'));
                console.log(' loaded the fourth sound (4)');
                const { sound: cannonBallBounce } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonBallBounce.wav'));
                console.log(' loaded the fifth sound (5)');
                const { sound: tntCannonBallHit } = await Audio.Sound.createAsync(require('../../../../assets/sounds/woodHit.wav'));
                console.log(' loaded the sixth sound (6)');
                const { sound: cannonBallHitSand } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonBallHitsBottom.wav'));
                console.log(' loaded the seventh sound (7)');
                const { sound: backgroundWaves } = await Audio.Sound.createAsync(require('../../../../assets/sounds/backgroundWaves.wav'), {
                    isLooping: true,
                    volume: 0.15
                });
                console.log(' loaded the seventh sound (7)');

                setShootCannonSound(cannonShot);
                setTntExplosionSound(explosion);
                setFireworkSound(fireworks);
                setTntHandleClickSound(tntHandleClick);
                setCannonBallBounceSound(cannonBallBounce);
                setTntCannonBallHitSound(tntCannonBallHit);
                setCannonBallHitSandSound(cannonBallHitSand);
                setBackgroundWaveSound(backgroundWaves)
                setIsAudioLoaded(prev => !prev);

            } catch (e) {
                console.log('error loading music', e)
            }
        }

  return (
            <SoundContext.Provider value={{ sound, loadSound }}>
                {children}
            </SoundContext.Provider>
        );
    };

    export { SoundContext, SoundProvider };
