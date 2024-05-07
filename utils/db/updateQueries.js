import openDatabaseConnection from "./openDB";

// UPDATE LEVEL PASS TO TRUE
export async function updateLevelToPass(levelId) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData = await tx.executeSqlAsync(`
                    UPDATE levels
                    SET isOpen=1
                    WHERE levels.id=${+levelId + 1}
                `);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in updateLevelToPass ', error)
    }
}

// UPDATE LEVEL HIGHSCORE
export async function updateLevelHighScore(levelId, highscore) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData = await tx.executeSqlAsync(`
                    UPDATE levels
                    SET highscore=${+highscore}
                    WHERE levels.id=${+levelId} 
                `);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in updateLevelHighscore ', error)
    }
}

// UPDATE LEVEL ACCURACY
export async function updateLevelAccuracy(levelId, accuracy) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData = await tx.executeSqlAsync(`
                    UPDATE levels
                    SET accuracy=${+accuracy}
                    WHERE levels.id=${+levelId}
                `);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in updateLevelAccuracy ', error)
    }
}

// UPDATE LEVEL EARNED STARS
export async function updateLevelEarnedStars(levelId, earnedStars) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData = await tx.executeSqlAsync(`
                    UPDATE levels
                    SET earnedStars=${+earnedStars}
                    WHERE levels.id=${+levelId}
                `);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in updateLevelEarnedStars ', error)
    }
}

// ADD TO TOTAL POINTS 
export async function updateUserTotalPoints(points) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData = await tx.executeSqlAsync(`
                    UPDATE users
                    SET totalPoints = totalPoints + ${points} 
                    WHERE users.id=1
                `);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in update in add user total ', error)
    }
};

// UPDATE USER MUSIC OPTION
export async function updateUserMusicPref(userId, isOn) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData = await tx.executeSqlAsync(`
            UPDATE preferences 
            SET isSoundOn = ${isOn}
            WHERE id = (
                SELECT preferenceId 
                FROM users 
                WHERE id = ${userId}
            );
            `);
            data = myData.rows        
        });
        return data;
    } catch (error) {
        console.log('error in updating music ', error)
    }
};

// UPDATE USER SOUND EFFECTS OPTION
export async function updateUserSoundEfxPref(userId, isOn) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData = await tx.executeSqlAsync(`
            UPDATE preferences 
            SET isSoundEffectsOn = ${isOn}
            WHERE id = (
                SELECT preferenceId 
                FROM users 
                WHERE id = ${userId}
            );
            `);
            data = myData.rows        
        });
        return data;
    } catch (error) {
        console.log('error in updating sound effects ', error)
    }
};

// UPDATE USER MUSIC OPTION
export async function updateUserHapticsPref(userId, isOn) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData = await tx.executeSqlAsync(`
            UPDATE preferences 
            SET isHapticsOn = ${isOn}
            WHERE id = (
                SELECT preferenceId 
                FROM users 
                WHERE id = ${userId}
            );
            `);
            data = myData.rows        
        });
        return data;
    } catch (error) {
        console.log('error in updating Haptics ', error)
    }
};