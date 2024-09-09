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
                    currentCannonBallName VARCHAR(50) DEFAULT 'Iron',
                    currentCannonName VARCHAR(50) DEFAULT 'Classic'
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

                CREATE TABLE IF NOT EXISTS cannonSet (
                    id INTEGER PRIMARY KEY NOT NULL
                );

                CREATE TABLE IF NOT EXISTS cannons (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name VARCHAR(50),
                    price INTEGER,
                    power FLOAT,
                    isOwned INTEGER,
                    cannonSetId INTEGER,
                    FOREIGN KEY (cannonSetId) REFERENCES cannonSet(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name VARCHAR(50),
                    totalPoints INTEGER DEFAULT 0,
                    preferenceId INTEGER,
                    cannonBallSetId INTEGER,
                    cannonSetId INTEGER,
                    FOREIGN KEY (preferenceId) REFERENCES preferences(id) ON DELETE CASCADE,
                    FOREIGN KEY (cannonBallSetId) REFERENCES cannonBallSet(id) ON DELETE CASCADE
                    FOREIGN KEY (cannonSetId) REFERENCES cannonSet(id) ON DELETE CASCADE
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
            // Cannon Ball weight are in range 0.05 - 0.17. 
            // Cannon Ball size are in range 4 - 13
            // Cannon Ball Bounce are in range 0.55 - 0.95
            await db.execAsync(`

                INSERT INTO cannonBalls (name, color, gradientColor, price, isOwned, cannonBallSetId, size, weight, bounce)
                VALUES ('Iron', '#a19d94', '#D4D0D0', 0, 1, ${cannonBallSet}, 8, 0.16, 0.65);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Copper', '#b87333', '#d89924', 5000, ${cannonBallSet}, 11, 0.19, 0.65);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Lead', '#212121', '#4f4d4d', 10000, ${cannonBallSet}, 8, 0.22, 0.55);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Ruby', '#E0115F', '#ed5252', 30000, ${cannonBallSet}, 6, 0.16, 0.85);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Emerald', '#50C878', '#a8f49e', 30000, ${cannonBallSet}, 6, 0.13, 0.75);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Ice', '#26afcb', '#f0fbef', 30000, ${cannonBallSet}, 5, 0.13, 0.55);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Rubber', '#090808', '#353434', 30000, ${cannonBallSet}, 11, 0.16, 0.95);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Beach Ball', '#ff0000', '#0560e0', 30000, ${cannonBallSet}, 13, 0.10, 0.85);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('BB', '#ff7c02', '#faed99', 30000, ${cannonBallSet}, 5, 0.10, 0.75);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Eight Ball', 'black', 'eightBall', 40000, ${cannonBallSet}, 11, 0.13, 0.55);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Skull', 'black', 'skull', 40000, ${cannonBallSet}, 8, 0.13, 0.65);

                INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
                VALUES ('Ghost', '#e0d9d9', 'ghost', 40000, ${cannonBallSet}, 13, 0.13, 0.95);
            `)
            // await db.execAsync(`

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, isOwned, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Iron', '#a19d94', '#D4D0D0', 0, 1, ${cannonBallSet}, 8, 0.11, 0.65);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Copper', '#b87333', '#d89924', 5000, ${cannonBallSet}, 11, 0.14, 0.65);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Lead', '#212121', '#4f4d4d', 10000, ${cannonBallSet}, 8, 0.17, 0.55);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Ruby', '#E0115F', '#ed5252', 30000, ${cannonBallSet}, 6, 0.11, 0.85);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Emerald', '#50C878', '#a8f49e', 30000, ${cannonBallSet}, 6, 0.08, 0.75);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Ice', '#26afcb', '#f0fbef', 30000, ${cannonBallSet}, 4, 0.08, 0.55);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Rubber', '#090808', '#353434', 30000, ${cannonBallSet}, 11, 0.11, 0.95);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Beach Ball', '#ff0000', '#0560e0', 30000, ${cannonBallSet}, 13, 0.05, 0.85);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('BB', '#ff7c02', '#faed99', 30000, ${cannonBallSet}, 4, 0.05, 0.75);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Eight Ball', 'black', 'eightBall', 40000, ${cannonBallSet}, 11, 0.08, 0.55);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Skull', 'black', 'skull', 40000, ${cannonBallSet}, 8, 0.08, 0.65);

            //     INSERT INTO cannonBalls (name, color, gradientColor, price, cannonBallSetId, size, weight, bounce)
            //     VALUES ('Ghost', '#e0d9d9', 'ghost', 40000, ${cannonBallSet}, 13, 0.08, 0.95);
            // `)

            // Create Cannon Set
            const { lastInsertRowId: cannonSet } = await db.runAsync(`INSERT INTO cannonSet DEFAULT VALUES`);

            // Fill up the cannon set with cannon entries
            await db.execAsync(`

                INSERT INTO cannons (name, price, isOwned, power, cannonSetId)
                VALUES ('Classic', 0, 1, 1, ${cannonSet});

                INSERT INTO cannons (name, price, power, cannonSetId)
                VALUES ('Pajunga', 5000, 1.2, ${cannonSet});

                INSERT INTO cannons (name, price, power, cannonSetId)
                VALUES ('Bruno', 5000, 1.2, ${cannonSet});
                
                INSERT INTO cannons (name, price, power, cannonSetId)
                VALUES ('Arbor', 15000, 1.4, ${cannonSet});

                INSERT INTO cannons (name, price, power, cannonSetId)
                VALUES ('Gumbo', 15000, 1.4, ${cannonSet});

                INSERT INTO cannons (name, price, power, cannonSetId)
                VALUES ('Tuxedo', 30000, 1.6, ${cannonSet});

                INSERT INTO cannons (name, price, power, cannonSetId)
                VALUES ('Midnight', 30000, 1.6, ${cannonSet});
            `)
            // await db.execAsync(`

            //     INSERT INTO cannons (name, price, isOwned, power, cannonSetId)
            //     VALUES ('Classic', 0, 1, 1, ${cannonSet});

            //     INSERT INTO cannons (name, price, power, cannonSetId)
            //     VALUES ('Pajunga', 5000, 1.3, ${cannonSet});

            //     INSERT INTO cannons (name, price, power, cannonSetId)
            //     VALUES ('Bruno', 5000, 1.3, ${cannonSet});
                
            //     INSERT INTO cannons (name, price, power, cannonSetId)
            //     VALUES ('Arbor', 15000, 1.6, ${cannonSet});

            //     INSERT INTO cannons (name, price, power, cannonSetId)
            //     VALUES ('Gumbo', 15000, 1.6, ${cannonSet});

            //     INSERT INTO cannons (name, price, power, cannonSetId)
            //     VALUES ('Tuxedo', 30000, 1.9, ${cannonSet});

            //     INSERT INTO cannons (name, price, power, cannonSetId)
            //     VALUES ('Midnight', 30000, 1.9, ${cannonSet});
            // `)

            // Create User
            const { lastInsertRowId: newUserId } = await db.runAsync(`INSERT INTO users (name, preferenceId, cannonBallSetId, cannonSetId, totalPoints) VALUES ('mike', ${preferenceId}, ${cannonBallSet}, ${cannonSet}, 250000);`);

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
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Six', 'Level6', 1, ${mapTwoId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Seven', 'Level7', 1, ${mapTwoId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Eight', 'Level8', 1, ${mapTwoId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Nine', 'Level9', 1, ${mapTwoId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Ten', 'Level10', 1, ${mapTwoId});`);

            // Create Levels for Map Three
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Two', 'Level2', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Three', 'Level3', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Four', 'Level4', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Five', 'Level5', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Six', 'Level6', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Seven', 'Level7', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Eight', 'Level8', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Nine', 'Level9', 1, ${mapThreeId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Ten', 'Level10', 1, ${mapThreeId});`);

            // Create Levels for Map Four
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Two', 'Level2', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Three', 'Level3', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Four', 'Level4', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Five', 'Level5', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Six', 'Level6', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Seven', 'Level7', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Eight', 'Level8', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Nine', 'Level9', 1, ${mapFourId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Ten', 'Level10', 1, ${mapFourId});`);

            // Create Levels for Map Five
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level One', 'Level1', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Two', 'Level2', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOPen, mapId) VALUES ('Level Three', 'Level3', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Four', 'Level4', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Five', 'Level5', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Six', 'Level6', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Seven', 'Level7', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOPen, mapId) VALUES ('Level Eight', 'Level8', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Nine', 'Level9', 1, ${mapFiveId});`);
            await db.runAsync(`INSERT INTO levels (level, link, isOpen, mapId) VALUES ('Level Ten', 'Level10', 1, ${mapFiveId});`);

        } catch (error) {
            console.log('error in Init SQL function', error)
        }
    }

    // // DROP ALL TABLES TO RESET GAME
    // try {
    //     // await db.runAsync(`DROP TABLE IF EXISTS cannons;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS users;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS preferences;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS maps;`, []);
    //     await db.runAsync(`DROP TABLE IF EXISTS levels;`, []);

    // } catch (error) {
    //     console.log('error in deleting ', error)
    // }
}

