import { knex } from "../database/index.js";

import { AppError } from "../utils/app-error.js";

export class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { userID } = request.query;

    if (!title || !description || !rating) {
      throw new AppError("Informe todos os dados obrigatórios.");
    }

    if (!userID) {
      throw new AppError("Informe o id do usuário.");
    }

    const [movieNoteID] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id: userID,
    });

    if (tags) {
      const tagsInset = tags.map((tag) => {
        return {
          name: tag.toLowerCase(),
          movie_note_id: movieNoteID,
          user_id: userID,
        };
      });

      await knex("tags").insert(tagsInset);
    }

    return response.status(204).send();
  }

  async index(request, response) {
    const { userID, tags, title } = request.query;

    let movieNotes;

    if (tags) {
      const tagsArray = tags.split(",").map((tag) => tag.toLowerCase().trim());

      movieNotes = await knex("tags")
        .select(
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.description",
          "movie_notes.rating"
        )
        .innerJoin("movie_notes", "movie_notes.id", "tags.movie_note_id")
        .whereIn("tags.name", tagsArray)
        .where("movie_notes.user_id", userID);
    } else {
      movieNotes = await knex("movie_notes").where({
        user_id: userID,
      });
    }

    if (title) {
      movieNotes = movieNotes.filter((movieNote) =>
        movieNote.title.toLowerCase().includes(title.toLowerCase().trim())
      );
    }

    const userTags = await knex("tags").where({
      user_id: userID,
    });

    const movieNotesWithTags = movieNotes.map((movieNote) => {
      const tags = userTags.filter((tag) => tag.movie_note_id === movieNote.id);

      return {
        ...movieNote,
        tags,
      };
    });

    return response.json(movieNotesWithTags);
  }

  async show(request, response) {
    const { id } = request.params;

    const movieNote = await knex("movie_notes").where({ id }).first();

    if (!movieNote) {
      throw new AppError("Anotação não encontrado.");
    }

    const tags = await knex("tags").where({ movie_note_id: id });

    response.json({ ...movieNote, tags });
  }

  async update(request, response) {
    const { title, description, rating } = request.body;
    const { id } = request.params;

    if (!title && !description && !rating) {
      throw new AppError("Informe os dados para atualizar a anotação.");
    }

    const movieNote = await knex("movie_notes").where({ id }).first();

    if (!movieNote) {
      throw new AppError("Anotação não encontrado.");
    }

    await knex("movie_notes")
      .update({
        title: title ?? movieNote.title,
        description: description ?? movieNote.description,
        rating: rating ?? movieNote.rating,
        updated_at: knex.fn.now(),
      })
      .where({ id });

    return response.status(204).send();
  }

  async delete(request, response) {
    const { id } = request.params;

    const movieNote = await knex("movie_notes").where({ id }).first();

    if (!movieNote) {
      throw new AppError("Anotação não encontrada.");
    }

    await knex("movie_notes").where({ id }).delete();

    return response.status(204).send();
  }
}
