import { useState } from 'react';

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

const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGPT: false }]);

    // TODO: Use case
    setIsLoading(false);

    // Add message from GPT
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello! You can write your text in English and I'll be happy to check the orthography" />

          {messages.map((message, index) =>
            message.isGPT ? (
              <GPTMessage key={index} text="This is from OpenAI" />
            ) : (
              <MyMessage key={index} text={message.text} />
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

export default ChatTemplate;
