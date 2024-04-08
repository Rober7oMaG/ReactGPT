export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/text-to-audio`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          voice,
        }),
      },
    );

    const audioFile = await response.blob();
    const audioURL = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioURL,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Could not generate audio',
    };
  }
};
