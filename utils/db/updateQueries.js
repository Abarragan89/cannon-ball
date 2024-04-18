import openDatabaseConnection from "./openDB";

// UPDATE LEVEL PASS TO TRUE
export async function updateLevelToPass(levelId) {
    let data;
    const db = openDatabaseConnection();
    try {
        console.log('in update level pass')
        await db.transactionAsync(async tx => {
            const myData =  await tx.executeSqlAsync(`
                    UPDATE levels
                    SET passed=1
                    WHERE levels.id=${+levelId}
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
        console.log('in update level highscore')
        await db.transactionAsync(async tx => {
            const myData =  await tx.executeSqlAsync(`
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
        console.log('in update level accuracy')
        await db.transactionAsync(async tx => {
            const myData =  await tx.executeSqlAsync(`
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
        console.log('in update level stars')

        await db.transactionAsync(async tx => {
            const myData =  await tx.executeSqlAsync(`
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