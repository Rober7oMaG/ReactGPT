import { useState } from 'react';

import { orthographyUseCase } from '@core/use-cases';
import {
  GPTMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@presentation/components';
import { GPTOrthographyMessage } from '@presentation/components/chat-bubbles';

interface Message {
  text: string;
  isGPT: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGPT: false }]);

    const { ok, userScore, errors, message } = await orthographyUseCase(text);
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: 'Could not make the correction', isGPT: true },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isGPT: true,
        info: {
          userScore,
          errors,
          message,
        },
      },
    ]);

    setIsLoading(false);

    // Add message from GPT
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello! You can write your text in English and I'll be happy to check the orthography" />

          {messages.map(({ isGPT, text, info }, index) =>
            isGPT ? (
              <GPTOrthographyMessage key={index} {...info!} />
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

export default OrthographyPage;
