import knex from "knex";

import knexConfig from "../../../knexfile.js";

export const knexConnection = knex(knexConfig.development);
