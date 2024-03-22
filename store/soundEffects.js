import { createContext, useState, useEffect } from "react";
import { Audio } from 'expo-av';

// You don't need to add initial context values, 
// but it helps with autocompletion
export const SoundEffects = createContext({
    soundEffects: {},
})


// function component so we can use this context as a wrapper 
// we can also add all the context logic in the component
function SoundEffectsProvider({ children }) {
    ///////////////////// CREATE SOUNDS /////////////////////
    const [cannonBallSound, setCannonBallSound] = useState();
    const [fireworkSound, setFireworkSound] = useState();
    const [explosionSound, setExplosionSound] = useState();
    const [tntHandleClickSound, setTntHandleClickSound] = useState();

    useEffect(() => {
        // import sounds and save in state
        async function loadAudio() {
            console.log(' in the audio loading function ')
            const { sound: cannonShot } = await Audio.Sound.createAsync(require('../assets/sounds/cannonShot.mp3'));
            const { sound: explosion } = await Audio.Sound.createAsync(require('../assets/sounds/hugeExplosion.wav'));
            const { sound: fireworks } = await Audio.Sound.createAsync(require('../assets/sounds/fireworks.wav'));
            const { sound: tntHandleClick } = await Audio.Sound.createAsync(require('../assets/sounds/tntHandleClick.wav'))

            setCannonBallSound(cannonShot);
            setExplosionSound(explosion);
            setFireworkSound(fireworks);
            setTntHandleClickSound(tntHandleClick);
            // setIsAudioLoaded(true);
        }

        loadAudio();
        // unload sounds when unmounted
        return () => {
            if (cannonBallSound) cannonBallSound.unloadAsync();
            if (fireworkSound) fireworkSound.unloadAsync();
            if (explosionSound) explosionSound.unloadAsync();
            if (tntHandleClickSound) tntHandleClickSound.unloadAsync();
        }
    }, [])

    const [soundEffects, setSoundEffects] = useState({
        cannonBallSound,
        explosionSound,
        fireworkSound,
        tntHandleClickSound,
    });

    const value = {
        sounds: soundEffects,
    }

    return (
        <SoundEffects.Provider value={value}>
            {children}
        </SoundEffects.Provider>
    )

}

export default SoundEffectsProvider