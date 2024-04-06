import { hash } from "bcrypt";
import { knex } from "../database/index.js";
import { AppError } from "../utils/app-error.js";

export class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Informe todos os dados obrigatórios.");
    }

    const [userAlreadyExists] = await knex("users").where({ email });

    if (userAlreadyExists) {
      throw new AppError("Este e-mail já esta em uso.");
    }

    const passwordHash = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: passwordHash,
    });

    return response.status(201).send();
  }

  async index(request, response) {
    const { name, email } = request.query;

    let users = await knex("users").orderBy("users.name");

    if (name || email) {
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(name?.toLowerCase()) ||
          user.email.toLowerCase().includes(email?.toLowerCase())
      );
    }

    return response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    return response.json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, password } = request.body;

    if (!name && !email && !password) {
      throw new AppError("Informe os dados para atualizar o usuário.");
    }

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    if (email) {
      const emailAlreadyExists = await knex("users").where({ email }).first();

      if (emailAlreadyExists && emailAlreadyExists.id !== user.id) {
        throw new AppError("Este e-mail já esta em uso.");
      }
    }

    let passwordHash;

    if (password) {
      passwordHash = await hash(password, 8);
    }

    await knex("users")
      .update({
        name: name ?? user.name,
        email: email ?? user.email,
        password: passwordHash ?? user.password,
        updated_at: knex.fn.now(),
      })
      .where({ id });

    return response.status(204).send();
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    await knex("users").where({ id }).delete();

    return response.status(204).send();
  }
}
