import { sqliteConnection } from "../index.js";
import { createUsers } from "./createUsers.js";

export async function migrationsRun() {
  const schema = [createUsers].join("");

  sqliteConnection()
    .then((database) => {
      database.exec(schema);
    })
    .catch((error) => {
      console.log(error);
    });
}
