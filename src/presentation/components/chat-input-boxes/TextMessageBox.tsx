import { FormEvent, useState } from 'react';

type TextMessageBoxProps = {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
};

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
}: TextMessageBoxProps) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim() === '') return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <form
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
      onSubmit={handleSendMessage}
    >
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
        <button className="btn-primary">
          <span className="mr-2">Send</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
