import Markdown from 'react-markdown';

type GPTMessageProps = {
  text?: string;
  audio?: string;
  imageUrl?: string;
  alt?: string;
};

export const GPTMessage = ({ text, audio, imageUrl, alt }: GPTMessageProps) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          R
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          {text && <Markdown>{text}</Markdown>}

          {audio && <audio className="w-full" src={audio} controls autoPlay />}

          {imageUrl && (
            <img
              className="rounded-xl w-96 h-96 object-cover"
              src={imageUrl}
              alt={alt}
            />
          )}
        </div>
      </div>
    </div>
  );
};
