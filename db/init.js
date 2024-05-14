import openDatabaseConnection from './openDB';

export async function initDB() {
    let needInitialSetup = false;
    const db = await openDatabaseConnection();

    // check to see if there is a user
    try {
        await db.getFirstAsync('SELECT * FROM users');

    } catch (error) {
        console.log('error in looking up user ', error)
        needInitialSetup = true
    }

    // do Initial set up if no user found
    if (needInitialSetup) {
        try {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS preferences (
                    id INTEGER PRIMARY KEY NOT NULL,
                    isSoundOn INTEGER DEFAULT 1,
                    isSoundEffectsOn INTEGER DEFAULT 1,
                    isHapticsOn INTEGER DEFAULT 1,
                    hasSeenTutorial INTEGER DEFAULT 0,
                    currentCannonBallName VARCHAR(50) DEFAULT 'Classic Black'
                );  

                CREATE TABLE IF NOT EXISTS cannonBallSet (
                    id INTEGER PRIMARY KEY NOT NULL
                );
                
                CREATE TABLE IF NOT EXISTS cannonBalls (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name VARCHAR(50),
                    color VARCHAR(50),
                    gradientColor VARCHAR(50),
                    size INTEGER,
                    price INTEGER,
                    bounce INTEGER,
                    weight INTEGER,
                    isOwned INTEGER DEFAULT 0,
                    cannonBallSetId INTEGER,
                    FOREIGN KEY (cannonBallSetId) REFERENCES cannonBallSet(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name VARCHAR(50),
                    totalPoints INTEGER DEFAULT 0,
                    preferenceId INTEGER,
                    cannonBallSetId INTEGER,
                    FOREIGN KEY (preferenceId) REFERENCES preferences(id) ON DELETE CASCADE,
                    FOREIGN KEY (cannonBallSetId) REFERENCES cannonBallSet(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS maps (
                    id INTEGER PRIMARY KEY NOT NULL,
                    mapName VARCHAR(100),
                    userId INTEGER,
                    FOREIGN KEY (userId) REFERENCES users(id)
                );  

                CREATE TABLE IF NOT EXISTS levels (
                    id INTEGER PRIMARY KEY NOT NULL,
                    level VARCHAR(50) NOT NULL,
                    link VARCHAR(50) NOT NULL,
                    accuracy FLOAT DEFAULT 50,
                    highscore INTEGER DEFAULT 0,
                    isOpen INTEGER DEFAULT 0,
                    earnedStars INTEGER DEFAULT 0,
                    mapId INTEGER,
                    FOREIGN KEY (mapId) REFERENCES maps(id)
                );
            `)

        } catch (error) {
            console.log('error creating tables ', error)
        }
    }

    // // Only create new tables and new user if new user doesn't already exist. 
    if (needInitialSetup) {
        try {

            // Set Default Preferences
            const { lastInsertRowId: preferenceId } = await db.runAsync(`INSERT INTO preferences DEFAULT VALUES;`);

            // Create cannonBallSet entry for new user
            const { lastInsertRowId: cannonBallSet } = await db.runAsync(`INSERT INTO cannonBallSet DEFAULT VALUES`);

            // Create Cannon Balls for user and attached them to cannonBallSet
            await db.execAsync(`

                INSERT INTO cannonBalls (name, color, gradientColor, size, price, bounce, weight, isOwned, cannonBallSetId)
                VALUES ('Classic Black', 'black', 'rgba(52, 51, 51, 1)', 10, 20000, 0.8, 1, 1, ${cannonBallSet});

                INSERT INTO cannonBalls (name, color, gradientColor, size, price, bounce, weight, cannonBallSetId )
                VALUES ('Red Raider', 'red', '#fc8686ff', 7, 20000, 0.5, 1, ${cannonBallSet});


                INSERT INTO cannonBalls (name, color, gradientColor, size, price, bounce, weight, cannonBallSetId )
                VALUES ('Orange Outlaw', 'orange', '#ffcd70', 7, 30000, 0.5, 1, ${cannonBallSet});


                INSERT INTO cannonBalls (name, color, gradientColor, size, price, bounce, weight, cannonBallSetId )
                VALUES ('Yellow Fellow', '#c3c30f', '#f9f9b2', 7, 40000, 0.5, 1, ${cannonBallSet});

                INSERT INTO cannonBalls (name, color, gradientColor, size, price, bounce, weight, cannonBallSetId )
                VALUES ('Greedy Green', 'green', '#6ef96e', 7, 50000, 0.5, 1, ${cannonBallSet});


                INSERT INTO cannonBalls (name, color, gradientColor, size, price, bounce, weight, cannonBallSetId )
                VALUES ('Purple Pirate', 'purple', '#d065d0', 7, 60000, 0.5, 1, ${cannonBallSet});

            `)

            // Create User
            const { lastInsertRowId: newUserId } = await db.runAsync(`INSERT INTO users (name, preferenceId, cannonBallSetId) VALUES ('mike', ${preferenceId}, ${cannonBallSet});`);

            // Create Maps
            const { lastInsertRowId: mapOneId } = await db.runAsync(`INSERT INTO maps (mapName, userId) VALUES ('Basics', ${newUserId});`);
            const { lastInsertRowId: mapTwoId } = await db.runAsync(`INSERT INTO maps (mapName, userId) VALUES ('Marks', ${newUserId});`);
            const { lastInsertRowId: mapThreeId } = await db.runAsync(`INSERT INTO maps (mapName, userId) VALUES ('Hinderance', ${newUserId});`);
            const { lastInsertRowId: mapFourId } = await db.runAsync(`INSERT INTO maps (mapName, userId) VALUES ('Kraken', ${newUserId});`);
            const { lastInsertRowId: mapFiveId } = await db.runAsync(`INSERT INTO maps (mapName, userId) VALUES ('Hatch', ${newUserId});`);

            // // Create Levels for Map One
            // await db.runAsync(`INSERT INTO levels (level, link, isOpen, earnedStars, mapId) VALUES ('Level One', 'Level1', 1, 47, ${mapOneId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapOneId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapOneId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapOneId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapOneId});`);

            // // Create Levels for Map Two
            // await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapTwoId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapTwoId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapTwoId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapTwoId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapTwoId});`);

            // // Create Levels for Map Three
            // await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapThreeId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapThreeId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapThreeId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapThreeId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapThreeId});`);

            // // Create Levels for Map Four
            // await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapFourId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapFourId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapFourId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapFourId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapFourId});`);

            // // Create Levels for Map Five
            // await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapFiveId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapFiveId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapFiveId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapFiveId});`);
            // await db.runAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapFiveId});`);



            ////////////////////////// ALL LEVELS ARE OPEN ////////////////////////////////
            // Create Levels for Map One
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, earnedStars, mapId) VALUES ('Level One', 'Level1', 1, 47, ${mapOneId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Two', 'Level2', 1, ${mapOneId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Three', 'Level3', 1, ${mapOneId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Four', 'Level4', 1, ${mapOneId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Five', 'Level5', 1, ${mapOneId});`);

            // Create Levels for Map Two
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapTwoId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Two', 'Level2', 1, ${mapTwoId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Three', 'Level3', 1, ${mapTwoId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Four', 'Level4', 1, ${mapTwoId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Five', 'Level5', 1, ${mapTwoId});`);

            // Create Levels for Map Three
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Two', 'Level2', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Three', 'Level3', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Four', 'Level4', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Five', 'Level5', 1, ${mapThreeId});`);

            // Create Levels for Map Four
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Two', 'Level2', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Three', 'Level3', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Four', 'Level4', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Five', 'Level5', 1, ${mapFourId});`);

            // Create Levels for Map Five
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Two', 'Level2', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOPen, mapId) VALUES ('Level Three', 'Level3', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Four', 'Level4', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Five', 'Level5', 1, ${mapFiveId});`);

        } catch (error) {
            console.log('error in Init SQL function', error)
        }
    }


    // try {
    //     await db.runAsync(`DROP TABLE IF EXISTS users;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS preferences;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS maps;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS levels;`, []);
    // } catch (error) {
    //     console.log('error in deleting ', error)
    // }
}

export async function getPreferences() {
    // const totalStarsInAMap = await getTotalStarsInMap(1, 'basics');
    // const totalStars = await getTotalStars(1);
    // const totalPoints = await getUserTotalPoints(1);
    // const individuallevelData = await getAllLevelDataInMap(1, 'basics')

    // const individualLevel = await getIndividualLevelData('Basics', 'Level1')
    // console.log('indidivual level data ', individuallevelData)
    // console.log('individual level data', individualLevel)
    // console.log('total Stars In A Map', totalStarsInAMap);
    // console.log('total Stars ', totalStars);
    // console.log('total Points', totalPoints);

}

