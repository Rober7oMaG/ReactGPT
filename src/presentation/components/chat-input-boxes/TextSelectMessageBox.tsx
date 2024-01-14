import { FormEvent, useState } from 'react';

interface Option {
  id: string;
  text: string;
}

type TextSelectMessageBoxProps = {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
};

export const TextSelectMessageBox = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  options,
}: TextSelectMessageBoxProps) => {
  const [message, setMessage] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim() === '') return;

    onSendMessage(message, selectedOption);
    setMessage('');
  };

  return (
    <form
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
      onSubmit={handleSendMessage}
    >
      <div className="flex-grow">
        <div className="flex">
          <input
            type="text"
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={placeholder}
            autoFocus
            autoComplete={disableCorrections ? 'off' : 'on'}
            autoCorrect={disableCorrections ? 'off' : 'on'}
            spellCheck={disableCorrections ? 'false' : 'true'}
          />

          <select
            className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            name="select"
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
          >
            <option value="">Select an option</option>
            {options.map(({ id, text }) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
          </select>
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
