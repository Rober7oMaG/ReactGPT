import { useState } from 'react';

import { prosConsUseCase } from '@core/use-cases';
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

const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGPT: false }]);

    const { ok, content } = await prosConsUseCase(text);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: 'Could not make the comparison', isGPT: true },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        text: content,
        isGPT: true,
        info: {
          content,
        },
      },
    ]);

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello! You can write anything you want me to compare and I'll give my opinion." />

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

export default ProsConsPage;
