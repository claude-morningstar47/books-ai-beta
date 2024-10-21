import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { language, title, expertise, genre, entrepreneurialInsights } = await req.json();

  // Création du prompt personnalisé basé sur les données fournies
  const prompt = `
  You are tasked with creating a detailed book plan.

  Title: ${title}
  Language: ${language}
  Expertise: ${expertise}
  Genre: ${genre}
  Entrepreneurial Insights: ${entrepreneurialInsights}

  Please generate an outline for this book, including suggestions for chapter titles and a brief description of what each chapter will cover. Ensure the outline reflects the expertise and entrepreneurial insights provided.
  `;

  // Appel à l'API OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an AI writing assistant. Provide suggestions for the following prompt based on the given parameters.`,
      },
      { role: "user", content: prompt },
    ],
  });

  return NextResponse.json({ suggestion: completion.choices[0].message.content });
}
