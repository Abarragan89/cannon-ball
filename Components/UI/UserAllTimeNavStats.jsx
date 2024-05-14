import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { getUserTotalPoints, getTotalStars } from '../../db/selectQueries';

const UserAllTimeNavStats = () => {

  const [totalPoints, setTotalPoints] = useState(null);
  const [totalStars, setTotalStars] = useState(null);



  useEffect(() => {
    async function getUserData() {
      const totalPoints = await getUserTotalPoints(1);
      const totalStars = await getTotalStars(1);

      setTotalPoints(totalPoints[0])
      setTotalStars(totalStars[0])
    }
    getUserData();
  }, [])

  return (
    <>
      {totalPoints && totalStars &&
        <View style={styles.rootContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.statsText}>{totalPoints.totalPoints.toLocaleString()}</Text>
            <FontAwesome6 name="hockey-puck" size={16} color={colors.winningStar} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.statsText}>{totalStars.totalMapStars} /</Text>
            <Text style={styles.statsText}>75 </Text>
            <Fontisto name="star" size={15} color={colors.winningStar} />
          </View>
        </View>
      }
    </>
  )
}

export default UserAllTimeNavStats;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    marginHorizontal: 100,
  },
  statsText: {
    marginRight: 10,
    color: 'white',
    color: colors.offWhite,
    fontSize: 17,
    fontFamily: 'textFont',
  },
  textContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#0000003d',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 3,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  }
})
