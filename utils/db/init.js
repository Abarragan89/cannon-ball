import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('cannonBallDB', 1);


export async function initDB() {
    await db.transactionAsync(async tx => {



        // check to see if there is something in the db already
        const isAccountMade = await tx.executeSqlAsync(`
            SELECT * FROM users;
        `)

        console.log('lenght of rows', isAccountMade)
        // Only create new tables and new user if new user doesn't already exist. 
        if (isAccountMade.rows.length === 0) {
            /////////// Create Map Table ///////////
            await tx.executeSqlAsync(`
                CREATE TABLE IF NOT EXISTS maps (
                    id INTEGER PRIMARY KEY NOT NULL,
                    mapName TEXT,
                    earnedStars INTEGER DEFAULT 0,
                    requiredStars INTEGER
                );  
            `, []);
            // Create maps
            const { insertId: mapOneId } = await tx.executeSqlAsync(`
                INSERT INTO maps (mapName, requiredStars) VALUES ('basics', 0);
            `, [])

            console.log('mapOneId', mapOneId)
            //////////// Crate Level Table ///////////////
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

            // Create Level
            const levelCreated = await tx.executeSqlAsync(`
                INSERT INTO levels (level, mapId) VALUES (1, ${mapOneId});
            `, []);

            console.log('levelcreated', levelCreated)

            // check to see if level is there
            const level = await tx.executeSqlAsync(`
                SELECT m.mapName, m.id, l.level, l.passed FROM levels l LEFT JOIN maps m ON l.mapId=m.id; 
            `)

            console.log('level', level)


            /////////// Create Preferences Table ///////////
            await tx.executeSqlAsync(`
            CREATE TABLE IF NOT EXISTS preferences (
                id INTEGER PRIMARY KEY NOT NULL,
                soundOn INTEGER DEFAULT 1,
                soundEffectsOn INTEGER DEFAULT 1,
                hasSeenTutorial INTEGER DEFAULT 0
                );  
                `, []);
            // Set Default Preferences
            const { insertId: preferenceId } = await tx.executeSqlAsync(`
                INSERT INTO preferences DEFAULT VALUES;
            `)


            /////////// Create User Table ///////////////
            await tx.executeSqlAsync(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT,
                    totalPoints INTEGER DEFAULT 0,
                    totalStars INTEGER DEFAULT 0,
                    preferenceId INTEGER,
                    FOREIGN KEY (preferenceId) REFERENCES preferences(id) ON DELETE CASCADE
                );
            `, []);
            // Create User
            await tx.executeSqlAsync(`  
                INSERT INTO users (name, totalPoints, totalStars, preferenceId) 
                    VALUES('mike', 1, 1, ${preferenceId});
            `, [])
        }




        // await tx.executeSqlAsync(`
        //  DELETE FROM users;  
        //  DELETE FROM maps;
        //  DELETE FROM levels;  
        // `)


    })
}

export async function getPreferences() {
    // Delete FROM preferences WHERE hasSeenTutorial=0;
    await db.transactionAsync(async tx => {
        const result = await tx.executeSqlAsync(`
            SELECT u.name, u.totalPoints, p.soundOn, p.hasSeenTutorial FROM users u LEFT JOIN preferences p ON u.preference_id=p.id;
        `)
        console.log('results ', result)
        result.rows.forEach((row) => {
            console.log('users', row)
        });
    })
}

