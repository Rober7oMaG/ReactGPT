import { ImageGenerationResponse } from '@interfaces';

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string,
): Promise<ImageGenerationResponse> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/image-generation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, originalImage, maskImage }),
      },
    );

    const { url, revised_prompt: alt } = await response.json();

    return { url, alt };
  } catch (error) {
    console.log(error);
    return null;
  }
};
