import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { language, title, expertise, genre, entrepreneurialInsights } = await req.json();

    // Vérification des données d'entrée
    if (!language || !title || !expertise || !genre || entrepreneurialInsights === undefined) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

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
      //   After providing the outline, include a brief development for each chapter that gives more detail on what will be covered in the chapter.

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

    // Vérification de la réponse de l'API
    if (completion.choices && completion.choices.length > 0) {
      return NextResponse.json({ suggestion: completion.choices[0].message.content });
    } else {
      return NextResponse.json({ error: "No suggestion generated" }, { status: 500 });
    }

  } catch (error) {
    // Gestion des erreurs
    console.error("Error generating book outline:", error);
    return NextResponse.json({ error: "Failed to generate suggestion" }, { status: 500 });
  }
}
