import { StyleSheet, Text, View } from 'react-native';
import { useRef, useEffect } from 'react';
import { Emitter } from 'react-native-particles'

function Explosion({ position, startAnimation }) {

    const emmiterEl = useRef(null)
    
    useEffect(() => {
        if (startAnimation === true && emmiterEl) {
            emmiterEl.current.start();
            console.log(emmiterEl)
        }
    }, [startAnimation, emmiterEl])
    

    return (
        <Emitter
        ref={emmiterEl}
        style={styles.emitter}
        numberOfParticles={450}
        emissionRate={5}
        interval={100}
        particleLife={500}
        direction={90}
        spread={360}
        gravity={0}
        autoStart={false}
        fromPosition={{ x: position[0], y: position[1] }}
      >
        <View style={styles.particle}></View>
      </Emitter>
    )

}

export default Explosion;

const styles = StyleSheet.create({
    particle: {
        width: 6,
        height: 6, 
        borderRadius: 12,
        backgroundColor: 'red'


    }
})