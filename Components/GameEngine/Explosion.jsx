import { StyleSheet, View } from 'react-native';
import { useRef, useEffect } from 'react';
import { Emitter } from 'react-native-particles'

function Explosion({ position, ballPosition, startAnimation, ballColor }) {

    const particle1El = useRef(null)
    const particle2El = useRef(null)
    const particle3El = useRef(null)
    const particle4El = useRef(null)
    const cannonBallEl = useRef(null)

    useEffect(() => {
        if (
            startAnimation === true
        ) {
            particle1El.current.start();
            particle2El.current.start();
            particle3El.current.start();
            particle4El.current.start();
            cannonBallEl.current.start();
        } 
    }, [startAnimation])


    return (
        <>
            <Emitter
                ref={particle1El}
                numberOfParticles={30}
                emissionRate={10}
                interval={100}
                particleLife={1000}
                direction={90}
                spread={360}
                gravity={0}
                speed={30}
                autoStart={false}
                fromPosition={{ x: position[0], y: position[1] }}
            >
                <View style={styles.particle1}></View>
            </Emitter>

            <Emitter
                ref={particle2El}
                numberOfParticles={30}
                emissionRate={10}
                interval={100}
                particleLife={1000}
                direction={90}
                spread={360}
                speed={30}
                gravity={0}
                autoStart={false}
                fromPosition={{ x: position[0], y: position[1] }}
            >
                <View style={styles.particle2}></View>
            </Emitter>

            <Emitter
                ref={particle3El}
                numberOfParticles={30}
                emissionRate={10}
                interval={100}
                particleLife={1000}
                direction={90}
                spread={360}
                speed={30}
                gravity={0}
                autoStart={false}
                fromPosition={{ x: position[0], y: position[1] }}
            >
                <View style={styles.particle3}></View>
            </Emitter>

            <Emitter
                ref={particle4El}
                numberOfParticles={30}
                emissionRate={10}
                interval={100}
                particleLife={1000}
                direction={90}
                spread={360}
                speed={30}
                gravity={0}
                autoStart={false}
                fromPosition={{ x: position[0], y: position[1] }}
            >
                <View style={styles.particle4}></View>
            </Emitter>

            {/* Cannon Ball Explosion */}
            <Emitter
                ref={cannonBallEl}
                numberOfParticles={100}
                emissionRate={100}
                interval={0}
                particleLife={1000}
                direction={360}
                spread={450}
                speed={50}
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
        borderRadius: 14,
        backgroundColor: 'red'
    },
    particle2: {
        width: 6,
        height: 6,
        borderRadius: 14,
        backgroundColor: '#f3ff0b'
    },
    particle3: {
        width: 6,
        height: 6,
        borderRadius: 14,
        backgroundColor: '#ffb300'
    },
    particle4: {
        width: 6,
        height: 6,
        borderRadius: 14,
        backgroundColor: '#e7ebe7'
    },
    cannonBall: {
        width: 6,
        height: 6,
        borderRadius: 14,
    }
})
