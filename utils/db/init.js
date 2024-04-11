import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('cannonBallDB', 1);


export async function initDB() {
    await db.transactionAsync(async tx => {

        // check to see if there is something in the db already
        const isAccountMade = await tx.executeSqlAsync(`
            SELECT * FROM users;
        `)

        // Only create new tables and new user if new user doesn't already exist. 
        if (isAccountMade.rows.length === 0) {
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
                        name TEXT,
                        totalPoints INTEGER DEFAULT 0,
                        totalStars INTEGER DEFAULT 0,
                        preference_id INTEGER,
                        FOREIGN KEY (preference_id) REFERENCES preferences(id) ON DELETE CASCADE
                    );
                    `, []);
                /////////// Create Map Table ///////////
                await tx.executeSqlAsync(`
                    CREATE TABLE IF NOT EXISTS maps (
                        id INTEGER PRIMARY KEY NOT NULL,
                        mapName TEXT,
                        earnedStars INTEGER DEFAULT 0,
                        requiredStars INTEGER,
                        user_id INTEGER,
                        FOREIGN KEY (user_id) REFERENCES users(id)
                    );  
                    `, []);
                //////////// Create Level Table ///////////////
                await tx.executeSqlAsync(`
                CREATE TABLE IF NOT EXISTS levels (
                        id INTEGER PRIMARY KEY NOT NULL,
                        level INTEGER,
                        accuracy INTEGER DEFAULT 0,
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
                const { insertId: newUserId } = await tx.executeSqlAsync(`INSERT INTO users (name, preference_id) VALUES ('mike', ${preferenceId});`, []);
                // Create Maps
                const { insertId: mapOneId } = await tx.executeSqlAsync(`INSERT INTO maps (mapName, requiredStars, user_id) VALUES ('basics', 0 ${newUserId});`, []);
                // Create Level
                await tx.executeSqlAsync(`INSERT INTO levels (level, mapId) VALUES (1, ${mapOneId});`, []);

            } catch (error) {
                console.log('error in Init SQL function', error)
            }
        }


        // try {
        //     await tx.executeSqlAsync(`DELETE FROM users;`, [])
        //     await tx.executeSqlAsync(`DELETE FROM preferences;`, [])
        //     await tx.executeSqlAsync(`DELETE FROM maps;`, [])
        //     await tx.executeSqlAsync(`DELETE FROM levels;`, [])
        // } catch (error) {
        //     console.log('error in deleting ', error)
        // }

    })
}

export async function getPreferences() {
    // Delete FROM preferences WHERE hasSeenTutorial=0;
    await db.transactionAsync(async tx => {
        try {
            const result = await tx.executeSqlAsync(`
                SELECT u.name, u.totalPoints, p.soundOn, p.hasSeenTutorial FROM users u LEFT JOIN preferences p ON u.preference_id=p.id;
            `)
            // const result = await tx.executeSqlAsync(`
            //     SELECT * from users;
            // `)
            console.log('results ', result)
            result.rows.forEach((row) => {
                console.log('users', row)
            });
        } catch (error) {
            console.log('error in get preference ', error)
        }
    })
}

