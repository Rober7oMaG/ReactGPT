import { useState } from 'react';

import { translateUseCase } from '@core/use-cases';
import { languages } from '@data';
import {
  GPTMessage,
  MyMessage,
  TextSelectMessageBox,
  TypingLoader,
} from '@presentation/components';

interface Message {
  text: string;
  isGPT: boolean;
}

const TranslateTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string, language: string) => {
    setIsLoading(true);

    const newMessage = `Translate: "${text}" to ${language}`;

    setMessages((prev) => [...prev, { text: newMessage, isGPT: false }]);

    const { ok, text: textResponse } = await translateUseCase(text, language);

    setIsLoading(false);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: 'Could not translate the text', isGPT: true },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { text: textResponse, isGPT: true }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello! You can write a text in English and I can translate it to any language you want" />

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

      <TextSelectMessageBox
        onSendMessage={handleSendMessage}
        placeholder="Write anything"
        options={languages}
      />
    </div>
  );
};

export default TranslateTemplate;
