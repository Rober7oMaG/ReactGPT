import { isResponseOk } from '@helpers';
import { ProsConsResponse } from '@interfaces';
import { axiosClient } from '@services';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const { data, status } = await axiosClient.post<ProsConsResponse>(
      '/pros-cons-discusser',
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
      content: 'Could not process pros-cons check',
    };
  }
};
