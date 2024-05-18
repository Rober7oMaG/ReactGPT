import {
  OrthographyPage,
  ProsConsPage,
  ProsConsStreamPage,
  TranslatePage,
  TextToAudioPage,
  ImageGenerationPage,
  AudioToTextPage,
  AssistantPage,
  ImageVariationPage,
} from '@presentation/pages';

export const menuRoutes = [
  {
    to: '/orthography',
    icon: 'fa-solid fa-spell-check',
    title: 'Orthography',
    description: 'Correct orthography',
    component: <OrthographyPage />,
  },
  {
    to: '/pros-cons',
    icon: 'fa-solid fa-code-compare',
    title: 'Pros & Cons',
    description: 'Compare pros and cons',
    component: <ProsConsPage />,
  },
  {
    to: '/pros-cons-stream',
    icon: 'fa-solid fa-water',
    title: 'Pros & Cons Stream',
    description: 'Using messages stream',
    component: <ProsConsStreamPage />,
  },
  {
    to: '/translate',
    icon: 'fa-solid fa-language',
    title: 'Translate',
    description: 'Texts to other languages',
    component: <TranslatePage />,
  },
  {
    to: '/text-to-audio',
    icon: 'fa-solid fa-podcast',
    title: 'Text to audio',
    description: 'Convert text to audio',
    component: <TextToAudioPage />,
  },
  {
    to: '/audio-to-text',
    icon: 'fa-solid fa-comment-dots',
    title: 'Audio to text',
    description: 'Convert audio to text',
    component: <AudioToTextPage />,
  },
  {
    to: '/image-generation',
    icon: 'fa-solid fa-image',
    title: 'Images',
    description: 'Generate images',
    component: <ImageGenerationPage />,
  },
  {
    to: '/image-variation',
    icon: 'fa-solid fa-wand-magic',
    title: 'Edit image',
    description: 'Images continuous generation',
    component: <ImageVariationPage />,
  },
  {
    to: '/assistant',
    icon: 'fa-solid fa-user',
    title: 'Assistant',
    description: 'Assistant Information',
    component: <AssistantPage />,
  },
];
