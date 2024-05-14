import openDatabaseConnection from "./openDB";

// GET TOTAL STARS IN SPECIFIC MAP
export async function getTotalStarsInMap(userId, mapName) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
            SELECT SUM(earnedStars) as totalMapStars
            FROM levels l
            WHERE l.mapId IN (
                SELECT m.id
                FROM users u
                LEFT JOIN maps m ON m.userId=${userId} AND m.mapName='${mapName}'
                GROUP BY m.mapName
            );
        `)
        return myData;
    } catch (error) {
        console.log('error in getTotalStarsInMap ', error)
    }
}

// GET TOTAL USER STARS
export async function getTotalStars(userId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
        SELECT SUM(earnedStars) as totalMapStars
        FROM levels l
        WHERE l.mapId IN (
            SELECT m.id
            FROM users u
            LEFT JOIN maps m ON m.userId=${userId}
            GROUP BY m.mapName);
        `);
        return myData;
    } catch (error) {
        console.log('error in getTotalStars ', error)
    }
}

// GET ALL LEVEL DATA IN A MAP (LEVEL LOBBY)
export async function getAllLevelDataInMap(userId, mapName) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
            SELECT level, accuracy, highscore, id, isOpen, earnedStars, link
            FROM levels l
            WHERE l.mapId IN (
                SELECT m.id
                FROM users u
                LEFT JOIN maps m ON m.userId=${userId} AND m.mapName='${mapName}'
                GROUP BY m.mapName
            );
        `)
        return myData;
    } catch (error) {
        console.log('error in individualLevelData ', error)
    }
}

// GET TOTAL USER POINTS
export async function getUserTotalPoints(userId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
            SELECT totalPoints 
            FROM users
            WHERE users.id=${userId};
        `)
        return myData;
    } catch (error) {
        console.log('error in get User Total Points ', error)
    }
}

// GET INDIVIDUAL LEVEL DATA
export async function getIndividualLevelData(mapName, level) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
            SELECT l.id, l.accuracy, l.highscore, l.earnedStars
            FROM levels l
            LEFT JOIN maps m ON l.mapId = m.id
            WHERE m.mapName = '${mapName}' AND l.link = '${level}';
        `)
        return myData;
    } catch (error) {
        console.log('error in individualLevelData ', error)

    }
}

// GET USER SETTINGS
export async function getUserDataPreferences(userId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
            SELECT * 
            FROM preferences p
            WHERE p.id = (
                SELECT preferenceId
                FROM users u
                WHERE u.id = ${userId}
            );
        `)
        return myData;
    } catch (error) {
        console.log('error in individualLevelData ', error)
    }
};

// GET USER CANNONBALLSET
export async function getUserCannonBalls(userId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
            SELECT cannonBalls.*
            FROM cannonBalls
            JOIN users ON cannonBalls.cannonBallSetId = users.cannonBallSetId
            WHERE users.id = ${userId};
        `)
        return myData;
    } catch (error) {
        console.log('error in individualLevelData ', error)
    }
};
