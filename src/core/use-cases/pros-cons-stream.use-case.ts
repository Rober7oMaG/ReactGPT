export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
        // TODO: AbortSignal
      },
    );

    if (!response.ok) throw new Error('Could not process orthography check');

    const reader = response.body?.getReader();
    if (!reader) console.error('Could not generate reader');

    return reader;
  } catch (error) {
    console.error(error);

    return null;
  }
};
