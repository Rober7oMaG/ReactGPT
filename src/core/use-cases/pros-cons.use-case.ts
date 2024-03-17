import { ProsConsResponse } from '@interfaces';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
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

    const data: ProsConsResponse = await response.json();

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      content: 'Could not process pros-cons check',
    };
  }
};
