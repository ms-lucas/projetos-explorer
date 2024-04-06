import { knex } from "../database/index.js";
import { AppError } from "../utils/app-error.js";

export class TagsController {
  async create(request, response) {
    const { name } = request.body;
    const { movieNoteID } = request.params;
    const { userID } = request.query;

    if (!name) {
      throw new AppError("Informe todos os dados obrigatórios.");
    }

    if (!userID) {
      throw new AppError("Informe o id do usuário.");
    }

    await knex("tags").insert({
      name,
      movie_note_id: movieNoteID,
      user_id: userID,
    });

    return response.status(204).send();
  }

  async index() {
    const tags = await knex("tags").orderBy("name");
  }
}
