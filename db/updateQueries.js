import openDatabaseConnection from "./openDB";

// UPDATE LEVEL PASS TO TRUE
export async function updateLevelToPass(levelId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE levels
            SET isOpen=1
            WHERE levels.id=${+levelId + 1};
        `)
        return myData;
    } catch (error) {
        console.log('error in updateLevelToPass ', error)
    }
}

// UPDATE LEVEL HIGHSCORE
export async function updateLevelHighScore(levelId, highscore) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE levels
            SET highscore=${+highscore}
            WHERE levels.id=${+levelId};
        `)
        return myData;
    } catch (error) {
        console.log('error in updateLevelHighscore ', error)
    }
}

// UPDATE LEVEL ACCURACY
export async function updateLevelAccuracy(levelId, accuracy) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE levels
            SET accuracy=${+accuracy}
            WHERE levels.id=${+levelId};
        `)
        return myData;
    } catch (error) {
        console.log('error in updateLevelAccuracy ', error)
    }
}

// UPDATE LEVEL EARNED STARS
export async function updateLevelEarnedStars(levelId, earnedStars) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE levels
            SET earnedStars=${+earnedStars}
            WHERE levels.id=${+levelId};
        `)
        return myData;
    } catch (error) {
        console.log('error in updateLevelEarnedStars ', error)
    }
}

// ADD TO TOTAL POINTS 
export async function updateUserTotalPoints(points) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE users
            SET totalPoints = totalPoints + ${points} 
            WHERE id=1;
        `)
        return myData;
    } catch (error) {
        console.log('error in update in add user total ', error)
    }
};

// UPDATE USER MUSIC OPTION
export async function updateUserMusicPref(userId, isOn) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE preferences 
            SET isSoundOn = ${isOn}
            WHERE id = (
                SELECT preferenceId 
                FROM users 
                WHERE id = ${userId}
            );
        `)
        return myData;
    } catch (error) {
        console.log('error in updating music ', error)
    }
};

// UPDATE USER SOUND EFFECTS OPTION
export async function updateUserSoundEfxPref(userId, isOn) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE preferences 
            SET isSoundEffectsOn = ${isOn}
            WHERE id = (
                SELECT preferenceId 
                FROM users 
                WHERE id = ${userId}
            );
        `)
        return myData;
    } catch (error) {
        console.log('error in updating sound effects ', error)
    }
};

// UPDATE USER HAPTICS OPTION
export async function updateUserHapticsPref(userId, isOn) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE preferences 
            SET isHapticsOn = ${isOn}
            WHERE id = (
                SELECT preferenceId 
                FROM users 
                WHERE id = ${userId}
            );
        `)
        return myData;
    } catch (error) {
        console.log('error in updating Haptics ', error)
    }
};

// UPDATE USER'S CURRENT EQUIPPED CANNON BALL
export async function updateUserCurrentCannonBall(userId, cannonBallName) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE preferences 
            SET currentCannonBallName = ?
            WHERE id = (
                SELECT preferenceId 
                FROM users 
                WHERE id = ?
            );
        `, [cannonBallName, userId])
        return myData;
    } catch (error) {
        console.log('error in updating current cannonBall ', error)
    }
};

// UPDATE USER'S OWNED EQUIPPED CANNON BALL
export async function updateUserCannonBallSet(cannonBallId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE cannonBalls 
            SET isOwned = 1
            WHERE id = ?;
        `, [cannonBallId])
        return myData;
    } catch (error) {
        console.log('error in updating current cannonBall ', error)
    }
};

// UPDATE USER'S CURRENT EQUIPPED CANNON
export async function updateUserCurrentCannon(userId, cannonName) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE preferences 
            SET currentCannonName = ?
            WHERE id = (
                SELECT preferenceId 
                FROM users 
                WHERE id = ?
            );
        `, [cannonName, userId])
        return myData;
    } catch (error) {
        console.log('error in updating current cannonBall ', error)
    }
};

// UPDATE USER'S OWNED EQUIPPED CANNON
export async function updateUserCannonSet(cannonId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE cannons
            SET isOwned = 1
            WHERE id = ?;
        `, [cannonId])
        return myData;
    } catch (error) {
        console.log('error in updating current cannonBall ', error)
    }
};

// UPDATE USER COINS
export async function updateUserCoins(userId, purchaseAmount) {
    const db = await openDatabaseConnection();
    try {
        await db.runAsync(`
            UPDATE users 
            SET totalPoints = totalPoints - ?
            WHERE id = ?;
        `, [purchaseAmount, userId])
        
        // Fetch the updated user data
        const updatedUserData = await db.getFirstAsync(`
            SELECT id, totalPoints 
            FROM users 
            WHERE id = ?;
        `, [userId]);

        return updatedUserData;
    } catch (error) {
        console.log('error in updating current cannonBall ', error)
    }
}

// UPDATE USER HAS SEEN TUTORIAL
export async function updateHasSeenTutorial(userId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.runAsync(`
            UPDATE preferences 
            SET hasSeenTutorial = 1
            WHERE id = (
                SELECT preferenceId
                FROM users
                WHERE id = ${userId}
            );
        `, [userId])
        return myData;
    } catch (error) {
        console.log('error in updating has seen tutorial', error)
    }
}