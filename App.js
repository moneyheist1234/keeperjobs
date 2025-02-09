import React from "react";
import AppNavigator from "./AppNavigator";
import { SQLiteProvider } from "expo-sqlite";


export default function App() {
  const createDbIfNeeded = async (db) => {
    console.log("creating database");
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY AUTOINCREMENT, job TEXT);
        `);
  };

  return (
    <SQLiteProvider databaseName="jobs" onInit={createDbIfNeeded}>
      <AppNavigator />
    </SQLiteProvider>
  );
}
