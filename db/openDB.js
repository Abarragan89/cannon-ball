import * as SQLite from 'expo-sqlite';

let db;
const openDatabaseConnection = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('cannonBallDB');
  }
  return db;
};

export default openDatabaseConnection;
