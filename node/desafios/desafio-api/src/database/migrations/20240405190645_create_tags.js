export async function up(knex) {
  await knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table
      .integer("movie_note_id")
      .references("id")
      .inTable("movie_notes")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable("tags");
}
