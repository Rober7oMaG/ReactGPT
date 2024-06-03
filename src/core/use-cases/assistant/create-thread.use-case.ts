import { axiosClient } from '@services';

export const createThreadUseCase = async () => {
  try {
    const { data } = await axiosClient.post(
      `${import.meta.env.VITE_ASSISTANT_API}/create-thread`,
    );

    const { id } = data as { id: string };

    return id;
  } catch (error) {
    throw new Error('An error has occurred while creating the thread');
  }
};
