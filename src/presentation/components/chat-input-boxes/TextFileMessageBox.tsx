import { FormEvent, useRef, useState } from 'react';

type TextFileMessageBoxProps = {
  onSendMessage: (message: string, file: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
};

export const TextFileMessageBox = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: TextFileMessageBoxProps) => {
  const [message, setMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) return;

    onSendMessage(message, selectedFile);
    setMessage('');
    setSelectedFile(null);
  };

  return (
    <form
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
      onSubmit={handleSendMessage}
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          onClick={() => fileInputRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(event) => setSelectedFile(event.target.files?.item(0))}
          accept={accept}
          hidden
        />
      </div>
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={placeholder}
            autoFocus
            autoComplete={disableCorrections ? 'off' : 'on'}
            autoCorrect={disableCorrections ? 'off' : 'on'}
            spellCheck={disableCorrections ? 'false' : 'true'}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary" disabled={!selectedFile}>
          <span className="mr-2">
            {!selectedFile
              ? 'Send'
              : selectedFile.name.substring(0, 10) + '...'}
          </span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
