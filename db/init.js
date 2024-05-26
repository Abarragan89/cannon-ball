import openDatabaseConnection from './openDB';

export async function initDB() {
    let needInitialSetup = false;
    const db = await openDatabaseConnection();

    // check to see if there is a user
    try {
        await db.getFirstAsync('SELECT * FROM users');

    } catch (error) {
        // Set variable to trigger set up
        const errorMsg = error.message;
        if (errorMsg.includes('no such table')) { needInitialSetup = true };
        console.log('error in init ', error);
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
                    currentCannonBallName VARCHAR(50) DEFAULT 'Iron'
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
                    bounce Float,
                    weight Float,
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
            // Cannon Ball weight are in range 0.6 - 1. The lower the decimal, the heavier the weight
            await db.execAsync(`

                INSERT INTO cannonBalls (name, color, gradientColor, price, isOwned, cannonBallSetId, size, weight, bounce)
                VALUES ('Iron', '#a19d94', '#D4D0D0', 20000, 1, ${cannonBallSet}, 8, 0.11, 0.65);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Copper', '#b87333', '#d89924', 20000, ${cannonBallSet}, 11, 0.14, 0.65);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Lead', '#212121', '#4f4d4d', 20000, ${cannonBallSet}, 8, 0.17, 0.55);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Ruby', '#E0115F', '#ed5252', 20000, ${cannonBallSet}, 6, 0.11, 0.85);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Emerald', '#50C878', '#a8f49e', 20000, ${cannonBallSet}, 6, 0.08, 0.75);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Ice', '#26afcb', '#f0fbef', 20000, ${cannonBallSet}, 4, 0.08, 0.55);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Rubber', '#090808', '#252121', 20000, ${cannonBallSet}, 11, 0.11, 0.95);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Beach Ball', '#ff0000', '#0560e0', 20000, ${cannonBallSet}, 13, 0.05, 0.85);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('BB', '#ff7c02', '#faed99', 20000, ${cannonBallSet}, 4, 0.05, 0.75);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Eight Ball', 'black', 'eightBall', 20000, ${cannonBallSet}, 11, 0.08, 0.55);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Skull', '#c6c6c6', 'skull', 20000, ${cannonBallSet}, 8, 0.08, 0.65);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Ghost', '#ffffff', 'ghost', 20000, ${cannonBallSet}, 13, 0.08, 0.95);
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
            // await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapOneId});`);
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

    // DROP ALL TABLES TO RESET GAME
    // try {
    //     await db.runAsync(`DROP TABLE IF EXISTS users;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS preferences;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS maps;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS levels;`, []);
    // } catch (error) {
    //     console.log('error in deleting ', error)
    // }
}

