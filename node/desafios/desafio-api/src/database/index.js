import knexSetup from "knex";
import path from "node:path";

export const knexConfig = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(import.meta.dirname, "tmp", "development.db"),
    },
    migrations: {
      directory: path.resolve(import.meta.dirname, "migrations"),
    },
    pool: {
      afterCreate: (connection, callback) => {
        connection.run("PRAGMA foreign_keys = ON", callback);
      },
    },
    useNullAsDefault: true,
  },
};

export const knex = knexSetup(knexConfig.development);
