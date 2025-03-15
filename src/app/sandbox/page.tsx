import { db } from "~/server/db";
import { character_portrait_table, character_table } from "~/server/db/schema";
import { fal } from "@fal-ai/client";
import { eq } from "drizzle-orm";
export default async function Sandbox() {
  // Fetch characters and their portraits
  const characters = await db
    .select()
    .from(character_table)
    .leftJoin(
      character_portrait_table,
      eq(character_table.id, character_portrait_table.characterId),
    );

  return (
    <div className="min-h-screen bg-[#0a0f1c] p-6 text-gray-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-500">Sandbox</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-[#2a3040] bg-[#1a1f2c]/80 p-6 lg:col-span-2">
            <form
              action={async (formData) => {
                "use server";
                const name = formData.get("name") as string;
                const className = formData.get("class") as string;
                const race = formData.get("race") as string;
                const background = formData.get("background") as string;

                console.log(name, className, race, background);

                const queryResult = await db.insert(character_table).values({
                  name,
                  class: className,
                  race,
                  background,
                });

                const characterId = queryResult[0].insertId;

                const prompt = `Create an illustration of a character named ${name}, a ${race} ${className}. This character is known for their ${background} background. Capture the essence of their class and race in a dynamic and engaging way.`;

                const result = await fal.subscribe(
                  "fal-ai/flux-pro/v1.1-ultra",
                  {
                    input: {
                      prompt,
                    },
                    logs: true,
                    onQueueUpdate: (update) => {
                      if (update.status === "IN_PROGRESS") {
                        update.logs
                          .map((log) => log.message)
                          .forEach(console.log);
                      }
                    },
                  },
                );
                console.log(result.data);
                console.log(result.requestId);

                const imageUrl = result.data?.images[0]?.url;

                if (imageUrl) {
                  await db.insert(character_portrait_table).values({
                    imageUrl,
                    characterId: BigInt(characterId),
                  });
                }
              }}
              className="space-y-4"
            >
              <div className="mb-4">
                <label className="mb-2 block text-white" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded border border-gray-600 bg-gray-900/50 p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-white" htmlFor="class">
                  Class
                </label>
                <input
                  type="text"
                  name="class"
                  className="w-full rounded border border-gray-600 bg-gray-900/50 p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-white" htmlFor="race">
                  Race
                </label>
                <input
                  type="text"
                  name="race"
                  className="w-full rounded border border-gray-600 bg-gray-900/50 p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-white" htmlFor="background">
                  Background
                </label>
                <input
                  type="text"
                  name="background"
                  className="w-full rounded border border-gray-600 bg-gray-900/50 p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-bold text-white">Characters</h2>
          <ul className="space-y-4">
            {characters.map((character) => (
              <li
                key={character.character.id}
                className="rounded-lg border border-[#2a3040] bg-[#1a1f2c]/80 p-4"
              >
                <h3 className="text-lg font-semibold text-blue-400">
                  {character.character.name}
                </h3>
                <p className="text-sm text-gray-300">
                  Class: {character.character.class}
                </p>
                <p className="text-sm text-gray-300">
                  Race: {character.character.race}
                </p>
                <p className="text-sm text-gray-300">
                  Background: {character.character.background}
                </p>
                {character.character_portrait?.imageUrl && (
                  <img
                    src={character.character_portrait.imageUrl}
                    alt={`${character.character.name} portrait`}
                    className="mt-2 h-auto w-full rounded"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
