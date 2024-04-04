import { resolve } from "node:path";

const knexConfig = {
  development: {
    client: "sqlite3",
    connection: {
      filename: resolve(
        import.meta.dirname,
        "src",
        "database",
        "tmp",
        "database.db"
      ),
    },
    pool: {
      afterCreate: (connection, cb) => {
        connection.run("PRAGMA foreign_keys = ON", cb);
      },
    },
    migrations: {
      directory: resolve(
        import.meta.dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
    useNullAsDefault: true,
  },
};

export default knexConfig;
