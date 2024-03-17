import { useRef, useState } from 'react';

import { prosConsStreamGeneratorUseCase } from '@core/use-cases';
import {
  GPTMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@presentation/components';

interface Message {
  text: string;
  isGPT: boolean;
}

const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const abortController = useRef(new AbortController());

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);

    // Cancel previous request if there's one in progress.
    if (isLoading) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setMessages((prev) => [...prev, { text, isGPT: false }]);

    const stream = prosConsStreamGeneratorUseCase(
      text,
      abortController.current.signal,
    );

    setIsLoading(false);

    setMessages((prev) => [...prev, { text: '', isGPT: true }]);

    for await (const message of stream) {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = message;

        return newMessages;
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello! You can write anything you want me to compare and I'll give my opinion (in real time)" />

          {messages.map(({ isGPT, text }, index) =>
            isGPT ? (
              <GPTMessage key={index} text={text} />
            ) : (
              <MyMessage key={index} text={text} />
            ),
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handleSendMessage}
        placeholder="Write anything"
        disableCorrections
      />
    </div>
  );
};

export default ProsConsStreamPage;
