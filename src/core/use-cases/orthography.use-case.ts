import { OrthographyResponse } from '@interfaces';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      },
    );

    if (!response.ok) throw new Error('Could not process orthography check');

    const data: OrthographyResponse = await response.json();

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'Could not process orthography check',
    };
  }
};
