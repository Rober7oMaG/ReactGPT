import { isResponseOk } from '@helpers';
import { OrthographyResponse } from '@interfaces';
import { axiosClient } from '@services';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const { data, status } = await axiosClient.post<OrthographyResponse>(
      '/orthography-check',
      {
        prompt,
      },
    );

    const responseOk = isResponseOk(status);

    if (!responseOk) throw new Error('Could not process orthography check');

    return {
      ok: responseOk,
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
