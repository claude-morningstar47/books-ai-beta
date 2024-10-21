import { Book, Chapter, Session } from "@/lib/types";
import { createBook } from "./actions";


// Fonction pour appeler l'API interne OpenAI via /api/ai/suggestions
async function generateBookPlan({
    language,
    title,
    expertise,
    genre,
    entrepreneurialInsights,
  }: {
    language: string;
    title: string;
    expertise: string;
    genre: string;
    entrepreneurialInsights: string;
  }) {
   
    // Appel à l'API interne
    const response = await fetch("/api/ai/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        language,
        expertise,
        genre,
        entrepreneurialInsights,
        // writingStyle: "informative", // ou toute autre valeur dynamique si tu veux la personnaliser

      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch book plan from AI");
    }
  
    const { suggestion } = await response.json();
    return suggestion;
  }
  
  // Fonction pour créer un nouveau livre avec un plan et des chapitres générés
  export async function createNewBookWithAI({
    session,
    newBookData,
  }: {
    session: Session;
    newBookData: {
      language: string;
      title: string;
      expertise: string;
      genre: string;
      entrepreneurialInsights: string;
    };
  }) {
    // Générer un plan et des chapitres via l'API interne
    const generatedContent = await generateBookPlan(newBookData);
  
    // Convertir la réponse de l'AI en chapitres (par exemple, chaque section du texte généré devient un chapitre)
    const chapters: Chapter[] = generatedContent.split("\n\n").map((section: string, index: number) => ({
      id: index + 1,
      title: `Chapter ${index + 1}: ${section.split("\n")[0]}`, // Titre du chapitre
      content: section, 
      order: index + 1,
    }));
  
    // Créer un nouvel objet Book avec les données fournies et les chapitres générés
    const newBook: Partial<Book> = {
      authorId: session?.user.id,
      language: newBookData.language,
      title: newBookData.title,
      genre: newBookData.genre,
      description: newBookData.expertise,
      entrepreneurialInsights: newBookData.entrepreneurialInsights,
      content: chapters, // Ajouter les chapitres générés
    };
  
    // Appeler ta fonction createBook pour enregistrer le livre dans la base de données
    const { id } = await createBook(newBook as Book);
  
    return id; // Retourner l'ID du nouveau livre
  }
  