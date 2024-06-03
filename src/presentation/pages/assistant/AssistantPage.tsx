import { useEffect, useState } from 'react';

import { createThreadUseCase } from '@core/use-cases';
import { postQuestionUseCase } from '@core/use-cases/assistant';
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

const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    const threadId = localStorage.getItem('threadId');

    if (threadId) setThreadId(threadId);
    else {
      createThreadUseCase().then((id) => {
        setThreadId(id);
        localStorage.setItem('threadId', id);
      });
    }
  }, []);

  useEffect(() => {
    if (threadId) {
      setMessages((prev) => [
        ...prev,
        { text: `Your thread ID is: ${threadId}`, isGPT: true },
      ]);
    }
  }, [threadId]);

  const handleSendMessage = async (text: string) => {
    if (!threadId) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGPT: false }]);

    const replies = await postQuestionUseCase(threadId, text);

    setIsLoading(false);

    // Clear messages
    setMessages([]);

    for (const reply of replies) {
      for (const message of reply.content) {
        setMessages((prev) => [
          ...prev,
          { text: message, isGPT: reply.role === 'assistant', info: reply },
        ]);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello, I'm Sam! I'll be happy to help you" />

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

export default AssistantPage;
