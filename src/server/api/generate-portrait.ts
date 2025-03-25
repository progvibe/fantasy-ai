import { fal } from "@fal-ai/client";

export async function generatePortraitHandler(
  formData: Record<string, string>,
) {
  try {
    const { name, class: className, race, background } = formData;

    const prompt = `Create an illustration of a character named ${name}, a ${race} ${className}. This character is known for their ${background} background. Capture the essence of their class and race in a dynamic and engaging way.`;

    const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
      input: { prompt },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    console.log("Result:", result);
    const imageUrl = result.data?.images[0]?.url;
    console.log("Image URL:", imageUrl);
    if (!imageUrl) {
      throw new Error("Failed to generate image URL");
    }

    return { portraitUrl: imageUrl };
  } catch (error) {
    console.error("Error generating character portrait:", error);
    throw error;
  }
}
