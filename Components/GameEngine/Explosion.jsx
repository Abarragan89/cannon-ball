import { StyleSheet, Text, View } from 'react-native';
import { useRef, useEffect } from 'react';
import { Emitter } from 'react-native-particles'

function Explosion({ position, startAnimation }) {

    const particle1El = useRef(null)
    const particle2El = useRef(null)
    const particle3El = useRef(null)
    const particle4El = useRef(null)

    
    useEffect(() => {
        if (
            startAnimation === true && 
            particle1El && 
            particle2El && 
            particle3El &&
            particle4El 
        ) {
            particle1El.current.start();
            particle2El.current.start();
            particle3El.current.start();
            particle4El.current.start();
        }
    }, [startAnimation, particle1El, particle2El, particle3El, particle4El])
    

    return (
        <>
        <Emitter
        ref={particle1El}
        numberOfParticles={450}
        emissionRate={5}
        interval={1}
        particleLife={500}
        direction={90}
        spread={360}
        gravity={0}
        autoStart={false}
        fromPosition={{ x: position[0], y: position[1] }}
      >
        <View style={styles.particle1}></View>
      </Emitter>

      <Emitter
        ref={particle2El}
        numberOfParticles={450}
        emissionRate={5}
        interval={1}
        particleLife={500}
        direction={90}
        spread={360}
        gravity={0}
        autoStart={false}
        fromPosition={{ x: position[0], y: position[1] }}
      >
        <View style={styles.particle2}></View>
      </Emitter>

      <Emitter
        ref={particle3El}
        numberOfParticles={450}
        emissionRate={5}
        interval={1}
        particleLife={500}
        direction={90}
        spread={360}
        gravity={0}
        autoStart={false}
        fromPosition={{ x: position[0], y: position[1] }}
      >
        <View style={styles.particle3}></View>
      </Emitter>

      <Emitter
        ref={particle4El}
        numberOfParticles={450}
        emissionRate={5}
        interval={1}
        particleLife={500}
        direction={90}
        spread={360}
        gravity={0}
        autoStart={false}
        fromPosition={{ x: position[0], y: position[1] }}
      >
        <View style={styles.particle4}></View>
      </Emitter>

        </>
    )

}

export default Explosion;

const styles = StyleSheet.create({
    particle1: {
        width: 6,
        height: 6, 
        borderRadius: 12,
        backgroundColor: 'red'
    },
    particle2: {
        width: 6,
        height: 6, 
        borderRadius: 12,
        backgroundColor: 'yellow'
    },
    particle3: {
        width: 6,
        height: 6, 
        borderRadius: 12,
        backgroundColor: 'orange'
    },
    particle4: {
        width: 6,
        height: 6, 
        borderRadius: 12,
        backgroundColor: 'black'
    }
})