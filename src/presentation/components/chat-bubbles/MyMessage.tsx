import Markdown from 'react-markdown';

type MyMessageProps = {
  text: string;
  image?: File;
};

export const MyMessage = ({ text, image }: MyMessageProps) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-start justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0">
          R
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
          <Markdown>{text}</Markdown>

          {image && (
            <img
              className="rounded-xl w-80 h-80 object-cover"
              src={URL.createObjectURL(image)}
              alt={'Image'}
            />
          )}
        </div>
      </div>
    </div>
  );
};
