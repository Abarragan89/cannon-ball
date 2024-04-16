import * as SQLite from 'expo-sqlite';

let db;
const openDatabaseConnection = () => {
  if (!db) {
    db = SQLite.openDatabase('cannonBallDB', 1);
  }
  return db;
};

export default openDatabaseConnection;
