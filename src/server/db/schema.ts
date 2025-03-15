import {
  bigint,
  text,
  singlestoreTable,
  index,
} from "drizzle-orm/singlestore-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const character_table = singlestoreTable("character", {
  id: bigint({ mode: "bigint" }).autoincrement().primaryKey(),
  name: text("name"),
  class: text("class"),
  race: text("race"),
  background: text("background"),
});

export const character_portrait_table = singlestoreTable(
  "character_portrait",
  {
    id: bigint({ mode: "bigint" }).autoincrement().primaryKey(),
    characterId: bigint({ mode: "bigint" }),
    imageUrl: text("image_url"),
  },
  (t) => {
    return [index("idx_character_portrait_character_id").on(t.characterId)];
  },
);
