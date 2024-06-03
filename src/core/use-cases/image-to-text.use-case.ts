export const imageToTextUseCase = async (file: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    if (prompt) formData.append('prompt', prompt);

    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/image-to-text`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) throw new Error('Could not get information from image');

    const data: { message: string } = await response.json();

    return data.message;
  } catch (error) {
    return null;
  }
};
