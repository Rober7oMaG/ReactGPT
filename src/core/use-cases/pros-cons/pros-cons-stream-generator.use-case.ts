export async function* prosConsStreamGeneratorUseCase(
  prompt: string,
  abortSignal: AbortSignal,
) {
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
        signal: abortSignal,
      },
    );

    if (!response.ok) throw new Error('Could not process orthography check');

    const reader = response.body?.getReader();
    if (!reader) console.error('Could not generate reader');

    const decoder = new TextDecoder();

    let text = '';

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader!.read();
      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;

      yield text;
    }
  } catch (error) {
    console.error(error);

    return null;
  }
}
