import { useState } from 'react';

import { audioToTextUseCase } from '@core/use-cases';
import {
  GPTMessage,
  MyMessage,
  TextFileMessageBox,
  TypingLoader,
} from '@presentation/components';

interface Message {
  text: string;
  isGPT: boolean;
}

const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGPT: false }]);

    const response = await audioToTextUseCase(audioFile, text);

    setIsLoading(false);

    if (!response) return;

    const gptMessage = `
## Transcription
__Duration:__ ${Math.round(response.duration)}
## Text:
${response.text}
`;

    setMessages((prev) => [...prev, { text: gptMessage, isGPT: true }]);

    for (const segment of response.segments) {
      const segmentMessage = `
__From ${Math.round(segment.start)} to ${Math.round(segment.end)} seconds:__
${segment.text}
`;

      setMessages((prev) => [...prev, { text: segmentMessage, isGPT: true }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GPTMessage text="Hello! I can help you converting an audio to text (in English)" />

          {messages.map(({ isGPT, text }, index) =>
            isGPT ? (
              <GPTMessage key={index} text={text} />
            ) : (
              <MyMessage
                key={index}
                text={text === '' ? 'Transcribe the audio' : text}
              />
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
        accept="audio/*"
      />
    </div>
  );
};

export default AudioToTextPage;
