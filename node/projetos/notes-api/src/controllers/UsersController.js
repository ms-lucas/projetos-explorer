import { hash } from "bcrypt";
import { sqliteConnection } from "../database/sqlite/index.js";
import { AppError } from "../utils/AppError.js";

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const userAlreadyExists = await database.get(
      `SELECT * FROM users WHERE users.email = '${email}'`
    );

    if (userAlreadyExists) {
      throw new AppError("Este e-mail já esta em uso.");
    }

    const passwordHash = await hash(password, 8);

    await database.run(`
      INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${passwordHash}')
    `);

    response.status(201).send();
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const user = await database.get(` SELECT * FROM users WHERE id = ${id}`);

    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    const userAlreadyExists = await database.get(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (userAlreadyExists && userAlreadyExists.id !== user.id) {
      throw new AppError("Este e-mail já esta em uso!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password) {
      const passwordHash = await hash(password, 8);
      user.password = passwordHash;
    }

    await database.run(`
      UPDATE 
        users
      SET 
        name = '${user.name}',
        email = '${user.email}',
        password = '${user.password}',
        updated_at = CURRENT_TIMESTAMP
      WHERE
        id = ${id};
    `);

    return response.status(204).send();
  }
}

export { UsersController };

