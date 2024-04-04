import { knexConnection } from "../database/knex/index.js";

export class NotesController {
  async index(request, response) {
    const { userId, tags, title } = request.query;

    let notesWhithTags, notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await knexConnection("tags")
        .select(["notes.id", "notes.title"])
        .innerJoin("notes", "notes.id", "tags.note_id")
        .where("notes.user_id", userId)
        .whereIn("name", filterTags)
        .orderBy("notes.title");
    } else {
      notes = await knexConnection("notes")
        .select(["notes.id", "notes.title"])
        .where("notes.user_id", userId)
        .orderBy("notes.title");
    }

    const userTags = await knexConnection("tags").where("tags.user_id", userId);

    notesWhithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    if (title) {
      notesWhithTags = notesWhithTags.filter((noteWhithTags) => {
        return noteWhithTags.title.includes(title);
      });
    }

    return response.json(notesWhithTags);
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knexConnection("notes")
      .where({
        id,
      })
      .first();

    const tags = await knexConnection("tags")
      .where({
        note_id: id,
      })
      .orderBy("name");

    const links = await knexConnection("links")
      .where({
        note_id: id,
      })
      .orderBy("created_at");

    return response.json({ ...note, tags, links });
  }

  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { userId } = request.params;

    const [noteId] = await knexConnection("notes").insert({
      title,
      description,
      user_id: userId,
    });

    console.log(noteId);

    const linksInsert = links.map((link) => {
      return {
        note_id: noteId,
        url: link,
      };
    });

    await knexConnection("links").insert(linksInsert);

    const tagsInset = tags.map((tag) => {
      return {
        note_id: noteId,
        name: tag,
        user_id: userId,
      };
    });

    await knexConnection("tags").insert(tagsInset);

    return response.status(201).send();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knexConnection("notes")
      .where({
        id,
      })
      .delete();

    return response.status(204).send();
  }
}
