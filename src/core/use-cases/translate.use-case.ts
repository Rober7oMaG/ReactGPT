import { TranslateResponse } from '@interfaces';

export const translateUseCase = async (prompt: string, language: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        language,
      }),
    });

    if (!response.ok) throw new Error('Could not process translation');

    const data: TranslateResponse = await response.json();

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      text: 'Could not process translation',
    };
  }
};
