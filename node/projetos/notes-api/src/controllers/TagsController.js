import { knexConnection } from "../database/knex/index.js";

export class TagsController {
  async index(request, response) {
    const { userId } = request.params;

    const tags = await knexConnection("tags")
      .where("tags.user_id", userId)
      .orderBy("name");

    return response.json(tags);
  }
}
