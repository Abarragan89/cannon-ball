import openDatabaseConnection from "./openDB";

// GET TOTAL STARS IN SPECIFIC MAP
export async function getTotalStarsInMap(userId, mapName) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData =  await tx.executeSqlAsync(`
                    SELECT SUM(earnedStars) as totalMapStars
                    FROM levels l
                    WHERE l.mapId IN (
                        SELECT m.id
                        FROM users u
                        LEFT JOIN maps m ON m.userId=${userId} AND m.mapName='${mapName}'
                        GROUP BY m.mapName
                    );
                `);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in getTotalStarsInMap ', error)
    }
}

// GET TOTAL USER STARS
export async function getTotalStars(userId) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData =  await tx.executeSqlAsync(`
                    SELECT SUM(earnedStars) as totalMapStars
                    FROM levels l
                    WHERE l.mapId IN (
                        SELECT m.id
                        FROM users u
                        LEFT JOIN maps m ON m.userId=${userId}
                        GROUP BY m.mapName
                    );`);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in getTotalStars ', error)
    }
}

// GET INDIVIDUAL LEVEL DATA (LEVEL LOBBY)
export async function getIndividualLevelData(userId, mapName) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData =  await tx.executeSqlAsync(`
                    SELECT level, accuracy, highscore, passed, earnedStars, link
                    FROM levels l
                    WHERE l.mapId IN (
                        SELECT m.id
                        FROM users u
                        LEFT JOIN maps m ON m.userId=${userId} AND m.mapName='${mapName}'
                        GROUP BY m.mapName
                    )
                    ;`);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in individualLevelData ', error)
    }
}

// GET TOTAL USER POINTS
export async function getUserTotalPoints(userId) {
    let data;
    const db = openDatabaseConnection();
    try {
        await db.transactionAsync(async tx => {
            const myData =  await tx.executeSqlAsync(`
                    SELECT totalPoints 
                    FROM users
                    WHERE users.id=${userId};
                `);
            data = myData.rows
        });
        return data;
    } catch (error) {
        console.log('error in getTotalStars ', error)
    }
}