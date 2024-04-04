import path from "path";
import sqlite3 from "sqlite3";

import { open } from "sqlite";

export async function sqliteConnection() {
  const database = await open({
    filename: path.resolve(import.meta.dirname, "..", "tmp", "database.db"),
    driver: sqlite3.Database,
  });

  return database;
}

