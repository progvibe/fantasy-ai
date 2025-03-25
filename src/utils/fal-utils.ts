import { fal } from "@fal-ai/client";

export async function generateCharacterPortrait(
  formData: Record<string, string>,
): Promise<string> {
  const { name, class: className, race, background } = formData;

  const prompt = `Create an illustration of a character named ${name}, a ${race} ${className}. This character is known for their ${background} background. Capture the essence of their class and race in a dynamic and engaging way.`;

  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
      input: { prompt },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    const imageUrl = result.data?.images[0]?.url;
    if (!imageUrl) {
      throw new Error("Failed to generate image URL");
    }

    return imageUrl;
  } catch (error) {
    console.error("Error generating character portrait:", error);
    throw error;
  }
}
