export async function up(knex) {
  await knex.schema.createTable("movie_notes", (table) => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.integer("rating").notNullable();
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
  await knex.schema.dropTable("movie_notes");
}
