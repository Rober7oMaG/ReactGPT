import { isResponseOk } from '@helpers';
import { TranslateResponse } from '@interfaces';
import { axiosClient } from '@services';

export const translateUseCase = async (prompt: string, language: string) => {
  try {
    const { data, status } = await axiosClient.post<TranslateResponse>(
      '/translate',
      {
        prompt,
        language,
      },
    );

    const responseOk = isResponseOk(status);
    if (!responseOk) throw new Error('Could not process translation');

    return {
      ok: responseOk,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      text: 'Could not process translation',
    };
  }
};
