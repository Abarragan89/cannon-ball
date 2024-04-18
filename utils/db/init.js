import openDatabaseConnection from './openDB';
import { getTotalStarsInMap, getTotalStars, getUserTotalPoints, getIndividualLevelData } from './selectQueries';

export async function initDB() {
    const db = openDatabaseConnection();
    await db.transactionAsync(async tx => {
        let needInitialSetup = false;

        // check to see if there is something in the db already
        try {
            await tx.executeSqlAsync(`
                SELECT * FROM users;
            `, [])

        } catch (error) {
            needInitialSetup = true
            console.log('error in looking up user ', error)
        }

        // // Only create new tables and new user if new user doesn't already exist. 
        if (needInitialSetup) {
            try {
                ///////// Create Preferences Table ///////////
                await tx.executeSqlAsync(`
                CREATE TABLE IF NOT EXISTS preferences (
                    id INTEGER PRIMARY KEY NOT NULL,
                        soundOn INTEGER DEFAULT 1,
                        soundEffectsOn INTEGER DEFAULT 1,
                        hasSeenTutorial INTEGER DEFAULT 0
                    );  
                    `, []);

                ///////// Create User Table ///////////////
                await tx.executeSqlAsync(`
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY NOT NULL,
                        name VARCHAR(50),
                        totalPoints INTEGER DEFAULT 0,
                        preferenceId INTEGER,
                        FOREIGN KEY (preferenceId) REFERENCES preferences(id) ON DELETE CASCADE
                    );
                    `, []);

                /////////// Create Map Table ///////////
                await tx.executeSqlAsync(`
                    CREATE TABLE IF NOT EXISTS maps (
                        id INTEGER PRIMARY KEY NOT NULL,
                        mapName VARCHAR(100),
                        userId INTEGER,
                        FOREIGN KEY (userId) REFERENCES users(id)
                    );  
                    `, []);

                //////////// Create Level Table ///////////////
                await tx.executeSqlAsync(`
                CREATE TABLE IF NOT EXISTS levels (
                        id INTEGER PRIMARY KEY NOT NULL,
                        level VARCHAR(50) NOT NULL,
                        link VARCHAR(50) NOT NULL,
                        accuracy FLOAT DEFAULT 0,
                        highscore INTEGER DEFAULT 0,
                        passed INTEGER DEFAULT 0,
                        earnedStars INTEGER DEFAULT 0,
                        mapId INTEGER,
                        FOREIGN KEY (mapId) REFERENCES maps(id)
                    );
                    `, [])

                // Set Default Preferences
                const { insertId: preferenceId } = await tx.executeSqlAsync(`INSERT INTO preferences DEFAULT VALUES;`, []);

                // Create User
                const { insertId: newUserId } = await tx.executeSqlAsync(`INSERT INTO users (name, preferenceId) VALUES ('mike', ${preferenceId});`, []);

                // Create Maps
                const { insertId: mapOneId } = await tx.executeSqlAsync(`INSERT INTO maps (mapName, userId) VALUES ('basics', ${newUserId});`, []);
                const { insertId: mapTwoId } = await tx.executeSqlAsync(`INSERT INTO maps (mapName, userId) VALUES ('marks', ${newUserId});`, []);
                const { insertId: mapThreeId } = await tx.executeSqlAsync(`INSERT INTO maps (mapName, userId) VALUES ('hinderance', ${newUserId});`, []);
                const { insertId: mapFourId } = await tx.executeSqlAsync(`INSERT INTO maps (mapName, userId) VALUES ('kraken', ${newUserId});`, []);
                const { insertId: mapFiveId } = await tx.executeSqlAsync(`INSERT INTO maps (mapName, userId) VALUES ('hatch', ${newUserId});`, []);

                // Create Levels for Map One
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, passed, mapId) VALUES ('Level One', 'Level1', 1, ${mapOneId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapOneId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapOneId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapOneId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapOneId});`, []);

                // Create Levels for Map Two
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level One', 'Level1', ${mapTwoId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapTwoId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapTwoId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapTwoId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapTwoId});`, []);

                // Create Levels for Map Three
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level One', 'Level1', ${mapThreeId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapThreeId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapThreeId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapThreeId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapThreeId});`, []);

                // Create Levels for Map Four
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level One', 'Level1', ${mapFourId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapFourId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapFourId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapFourId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapFourId});`, []);

                // Create Levels for Map Five
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level One', 'Level1', ${mapFiveId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Two', 'Level2', ${mapFiveId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Three', 'Level3', ${mapFiveId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Four', 'Level4', ${mapFiveId});`, []);
                await tx.executeSqlAsync(`INSERT INTO levels (level, link, mapId) VALUES ('Level Five', 'Level5', ${mapFiveId});`, []);

            } catch (error) {
                console.log('error in Init SQL function', error)
            }
        }


        // try {
        //     await tx.executeSqlAsync(`DROP TABLE IF EXISTS users;`, []);
        //     await tx.executeSqlAsync(`DROP TABLE IF EXISTS preferences;`, []);
        //     await tx.executeSqlAsync(`DROP TABLE IF EXISTS maps;`, []);
        //     await tx.executeSqlAsync(`DROP TABLE IF EXISTS levels;`, []);
        // } catch (error) {
        //     console.log('error in deleting ', error)
        // }

    })
}

export async function getPreferences() {
    // const totalStarsInAMap = await getTotalStarsInMap(1, 'basics');
    // const totalStars = await getTotalStars(1);
    // const totalPoints = await getUserTotalPoints(1);
    // const individuallevelData = await getIndividualLevelData(1, 'basics')

    // console.log('indidivual level data ', individuallevelData)
    // console.log('total Stars In A Map', totalStarsInAMap);
    // console.log('total Stars ', totalStars);
    // console.log('total Points', totalPoints);

}
