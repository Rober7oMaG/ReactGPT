import { ImageGenerationResponse } from '@interfaces';

export const imageVariationUseCase = async (
  originalImage: string,
): Promise<ImageGenerationResponse> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/image-variation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ baseImage: originalImage }),
      },
    );

    const { url, revised_prompt: alt } = await response.json();

    return { url, alt };
  } catch (error) {
    return null;
  }
};
