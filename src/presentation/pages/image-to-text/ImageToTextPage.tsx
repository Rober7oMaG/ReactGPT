import { useState } from 'react';

import { imageToTextUseCase } from '@core/use-cases';
import {
  GPTMessage,
  MyMessage,
  TextFileMessageBox,
  TypingLoader,
} from '@presentation/components';

interface Message {
  text: string;
  isGPT: boolean;
  image?: File;
}

const ImageToTextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string, file: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGPT: false, image: file }]);

    const message = await imageToTextUseCase(file, text);

    setIsLoading(false);

    if (!message) return;

    setMessages((prev) => [...prev, { text: message, isGPT: true }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello! I can give you the information of any image" />

          {messages.map(({ isGPT, text, image }, index) =>
            isGPT ? (
              <GPTMessage key={index} text={text} />
            ) : (
              <MyMessage key={index} text={text} image={image} />
            ),
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextFileMessageBox
        onSendMessage={handleSendMessage}
        placeholder="Write anything"
        disableCorrections
        accept="image/*"
      />
    </div>
  );
};

export default ImageToTextPage;
