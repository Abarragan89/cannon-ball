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

// GET HAS USER SEEN TUTORIAL STATUS
export async function getHasSeenTutorial(userId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
            SELECT hasSeenTutorial
            FROM preferences
            LEFT JOIN users
            WHERE users.id=${userId};
        `)
        return myData;
    } catch (error) {
        console.log('error in get has seen tutorial ', error)
    }
}

// GET INDIVIDUAL LEVEL DATA
export async function getIndividualLevelData(mapName, level) {
    console.log('mapName', mapName)
    console.log('level ', level)
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

// GET USER CANNONSET
export async function getUserCannons(userId) {
    const db = await openDatabaseConnection();
    try {
        const myData = await db.getAllAsync(`
            SELECT cannons.*
            FROM cannons
            JOIN users ON cannons.cannonSetId = users.cannonSetId
            WHERE users.id = ${userId};
        `)
        return myData;
    } catch (error) {
        console.log('error in individualLevelData ', error)
    }
};
