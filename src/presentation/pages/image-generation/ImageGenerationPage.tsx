import { useState } from 'react';

import { imageGenerationUseCase } from '@core/use-cases';
import {
  GPTMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@presentation/components';

interface Message {
  text: string;
  isGPT: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGPT: false }]);

    const imageInfo = await imageGenerationUseCase(text);

    setIsLoading(false);

    if (!imageInfo) {
      return setMessages((prev) => [
        ...prev,
        { text: 'Could not generate image', isGPT: true },
      ]);
    }

    const { url, alt } = imageInfo;

    setMessages((prev) => [
      ...prev,
      {
        text: text,
        isGPT: true,
        info: {
          imageUrl: url,
          alt,
        },
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello! What image do you want to generate?" />

          {messages.map(({ isGPT, text, info }, index) =>
            isGPT ? (
              <GPTMessage
                key={index}
                imageUrl={info?.imageUrl}
                alt={info?.alt}
              />
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

export default ImageGenerationPage;
