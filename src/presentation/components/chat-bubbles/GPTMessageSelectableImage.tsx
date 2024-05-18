import { useEffect, useRef, useState } from 'react';

type GPTMessageSelectableImageProps = {
  imageUrl?: string;
  alt?: string;
  onImageSelected?: (imageUrl: string) => void;
};

export const GPTMessageSelectableImage = ({
  imageUrl,
  onImageSelected,
}: GPTMessageSelectableImageProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const originalImageRef = useRef<HTMLImageElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl!;

    originalImageRef.current = image;

    image.onload = () => {
      context?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    setIsDrawing(true);

    // Get mouse coordinates relative to canvas
    const startX =
      event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const startY =
      event.clientY - canvasRef.current!.getBoundingClientRect().top;

    setCoords({ x: startX, y: startY });
  };

  const onMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL('image/png');

    onImageSelected && onImageSelected(url);
  };

  const onMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!isDrawing) return;

    const currentX =
      event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const currentY =
      event.clientY - canvasRef.current!.getBoundingClientRect().top;

    // Calculate rectangle width and height
    const width = currentX - coords.x;
    const height = currentY - coords.y;

    const canvaWidth = canvasRef.current!.width;
    const canvaHeight = canvasRef.current!.height;

    // Clear canvas
    const context = canvasRef.current!.getContext('2d')!;

    context.clearRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height,
    );
    context.drawImage(originalImageRef.current!, 0, 0, canvaWidth, canvaHeight);

    // Crop rectangle
    context.clearRect(coords.x, coords.y, width, height);
  };

  const resetCanvas = () => {
    const context = canvasRef.current!.getContext('2d')!;
    context.clearRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height,
    );
    context.drawImage(
      originalImageRef.current!,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height,
    );

    onImageSelected && onImageSelected(imageUrl!);
  };

  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          R
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <canvas
            ref={canvasRef}
            width={1024}
            height={1024}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          />

          <button
            className="btn-primary mt-2"
            onClick={resetCanvas}
            disabled={isDrawing}
          >
            Reset selection
          </button>
        </div>
      </div>
    </div>
  );
};
