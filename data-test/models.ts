export const types = ["GPT-3", "GPT-4", "Codex", "Gemini"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "text-davinci-003",
    description:
      "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output, and better instruction-following. Also supports inserting completions within text.",
    type: "GPT-3",
    strengths:
      "Complex intent, cause and effect, creative generation, search, summarization for audience",
  },
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "text-curie-001",
    description: "Very capable, but faster and lower cost than Davinci.",
    type: "GPT-3",
    strengths:
      "Language translation, complex classification, sentiment, summarization",
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "text-babbage-001",
    description: "Capable of straightforward tasks, very fast, and lower cost.",
    type: "GPT-3",
    strengths: "Moderate classification, semantic search",
  },
  {
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "text-ada-001",
    description:
      "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
    type: "GPT-3",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
  },
  {
    id: "7e36a4b3-5e75-4f9c-8e41-8a2459bb4e76",
    name: "gpt-4",
    description:
      "GPT-4 is more advanced than GPT-3, with better understanding of context, complex reasoning, and nuanced language tasks. It can handle more intricate instructions and generates more accurate and detailed responses.",
    type: "GPT-4",
    strengths:
      "Deep reasoning, complex instructions, improved context understanding, creative problem-solving",
  },
  {
    id: "f7d0c379-44df-4854-b26b-9c51b6f5b7d9",
    name: "gpt-4-turbo",
    description:
      "GPT-4 Turbo is a faster and more cost-effective variant of GPT-4, optimized for lower latency in real-time applications while retaining much of the core capabilities.",
    type: "GPT-4",
    strengths:
      "Low latency, real-time applications, efficient at complex tasks while being more cost-effective",
  },
  {
    id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
    name: "code-davinci-002",
    description:
      "Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.",
    type: "Codex",
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "code-cushman-001",
    description:
      "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
    type: "Codex",
    strengths: "Real-time application where low-latency is preferable",
  },
  {
    id: "9f1b1b5f-663d-42a4-bfae-7f14adcb2e02",
    name: "gemini-1",
    description:
      "Gemini 1 is a state-of-the-art model designed for natural language understanding and generation. It excels in a wide range of tasks, including conversation, summarization, and question answering, with a focus on advanced reasoning and contextual awareness.",
    type: "Gemini",
    strengths:
      "Contextual understanding, complex question answering, conversational AI, reasoning",
  },
  {
    id: "a2a1b3df-98f5-43d6-b51f-2c6e6d421a58",
    name: "gemini-1-turbo",
    description:
      "Gemini 1 Turbo is a faster variant of Gemini 1, offering improved response times for real-time interactions without compromising on the model's ability to handle complex tasks.",
    type: "Gemini",
    strengths:
      "Real-time interactions, low latency, optimized for high-speed conversational AI",
  },
];
