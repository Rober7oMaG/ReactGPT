import { PostQuestionResponse } from '@interfaces';
import { axiosClient } from '@services';

export const postQuestionUseCase = async (
  threadId: string,
  question: string,
) => {
  try {
    const { data } = await axiosClient.post<PostQuestionResponse[]>(
      `${import.meta.env.VITE_ASSISTANT_API}/user-question`,
      { threadId, question },
    );

    return data;
  } catch (error) {
    throw new Error('An error has occurred while posting the question');
  }
};
