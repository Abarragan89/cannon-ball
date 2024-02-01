import { StyleSheet, Text, View } from 'react-native';
import { useRef, useEffect } from 'react';
import { Emitter } from 'react-native-particles'

function Explosion({ position, ballPosition, startAnimation, ballColor }) {

    const particle1El = useRef(null)
    const particle2El = useRef(null)
    const particle3El = useRef(null)
    const cannonBallEl = useRef(null)


    useEffect(() => {
        if (
            startAnimation === true &&
            particle1El &&
            particle2El &&
            particle3El &&
            cannonBallEl
        ) {
            particle1El.current.start();
            particle2El.current.start();
            particle3El.current.start();
            cannonBallEl.current.start();
        }
    }, [startAnimation, particle1El, particle2El, particle3El, cannonBallEl])


    return (
        <>
            <Emitter
                ref={particle1El}
                numberOfParticles={450}
                emissionRate={10}
                interval={0}
                particleLife={500}
                direction={90}
                spread={360}
                gravity={0}
                speed={15}
                autoStart={false}
                fromPosition={{ x: position[0], y: position[1] }}
            >
                <View style={styles.particle1}></View>
            </Emitter>

            <Emitter
                ref={particle2El}
                numberOfParticles={450}
                emissionRate={10}
                interval={0}
                particleLife={500}
                direction={90}
                spread={360}
                speed={15}
                gravity={0}
                autoStart={false}
                fromPosition={{ x: position[0], y: position[1] }}
            >
                <View style={styles.particle2}></View>
            </Emitter>

            <Emitter
                ref={particle3El}
                numberOfParticles={450}
                emissionRate={10}
                interval={0}
                particleLife={500}
                direction={90}
                spread={360}
                speed={15}
                gravity={0}
                autoStart={false}
                fromPosition={{ x: position[0], y: position[1] }}
            >
                <View style={styles.particle3}></View>
            </Emitter>

            <Emitter
                ref={cannonBallEl}
                numberOfParticles={100}
                emissionRate={100}
                interval={0}
                particleLife={700}
                direction={360}
                spread={450}
                speed={15}
                gravity={0}
                autoStart={false}
                fromPosition={{ x: ballPosition[0], y: ballPosition[1] }}
            >
                <View style={[styles.cannonBall, {backgroundColor: ballColor}]}></View>
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
        backgroundColor: '#baba18'
    },
    particle3: {
        width: 6,
        height: 6,
        borderRadius: 12,
        backgroundColor: 'orange'
    },
    cannonBall: {
        width: 6,
        height: 6,
        borderRadius: 12,
    }
})