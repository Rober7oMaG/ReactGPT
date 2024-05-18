import { useState } from 'react';

import { imageGenerationUseCase, imageVariationUseCase } from '@core/use-cases';
import {
  GPTMessage,
  GPTMessageSelectableImage,
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

const ImageVariationPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [originalImageData, setOriginalImageData] = useState({
    image: undefined as string | undefined,
    maskImage: undefined as string | undefined,
  });

  const handleImageVariation = async () => {
    const { image } = originalImageData;
    if (!image) return;

    setIsLoading(true);
    const response = await imageVariationUseCase(image);
    setIsLoading(false);

    if (!response) return;

    setMessages((prev) => [
      ...prev,
      {
        text: 'Variation',
        isGPT: true,
        info: {
          imageUrl: response.url,
          alt: response.alt,
        },
      },
    ]);
  };

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGPT: false }]);

    const { image, maskImage } = originalImageData;

    const imageInfo = await imageGenerationUseCase(text, image, maskImage);

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
    <>
      {originalImageData.image && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editing</span>
          <img
            className="border rounded xl w-36 h-36 object-contain"
            src={originalImageData.maskImage ?? originalImageData.image}
            alt="Original image"
          />

          <button className="btn-primary mt-2" onClick={handleImageVariation}>
            Generate variation
          </button>
        </div>
      )}

      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/* Welcome */}
            <GPTMessage text="Hello! What image do you want to generate?" />

            {messages.map(({ isGPT, text, info }, index) =>
              isGPT ? (
                <GPTMessageSelectableImage
                  key={index}
                  imageUrl={info?.imageUrl}
                  alt={info?.alt}
                  onImageSelected={(maskImageUrl) =>
                    setOriginalImageData({
                      image: info?.imageUrl,
                      maskImage: maskImageUrl,
                    })
                  }
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
    </>
  );
};

export default ImageVariationPage;
