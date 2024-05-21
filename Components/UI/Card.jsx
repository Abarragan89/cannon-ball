import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../constants/colors';


const Card = ({ children, title }) => {
    
    return (
        <LinearGradient
            // Background Linear Gradient
            // first color is the white shine
            // colors={['#5c7dc5c2', '#0e53d3c2']}
            colors={['#5c7dc5c2', colors.skyColor]}
            locations={[0.01, 1]}
            end={{ x: 0.5, y: 0.3 }}
            style={styles.cardContainer}
        >
            <View style={styles.centerDiv}>
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            {children}
        </LinearGradient>
    )
}

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.primaryBlack,
        width: 350,
        borderRadius: 8,
        padding: 15,
    },
    centerDiv: {
        alignItems: 'center'
    },
    cardTitle: {
        fontFamily: 'textFont',
        fontSize: 29,
        color: colors.offWhite,
        marginBottom: 15
    }
})
