import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!API_KEY) {
  console.error(
    "⚠️ Gemini API key is not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file"
  );
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * Generates recipes based on provided ingredients
 * @param {string} ingredients - Comma-separated list of ingredients
 * @param {number} numberOfRecipes - Number of recipes to generate (1-10)
 * @returns {Promise<Array>} Array of recipe objects
 */
export const generateRecipes = async (ingredients, numberOfRecipes = 3) => {
  if (!genAI) {
    throw new Error(
      "Gemini API is not configured. Please add your API key to the .env file."
    );
  }

  try {
    // Use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create a detailed prompt for recipe generation
    const prompt = `You are a professional chef and recipe creator. Generate ${numberOfRecipes} unique and delicious recipes using the following ingredients: ${ingredients}.

Requirements:
1. Each recipe should use at least some of the provided ingredients
2. You can suggest additional common ingredients if needed to make the recipe complete
3. Provide detailed, step-by-step instructions
4. Include cooking time and servings information

Please format your response as a JSON array with the following structure for each recipe:
[
  {
    "name": "Recipe Name",
    "description": "Brief description of the dish",
    "cookTime": "Cooking time (e.g., 30 minutes)",
    "servings": "Number of servings (e.g., 4)",
    "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity", ...],
    "instructions": ["Step 1", "Step 2", ...]
  }
]

Important: Return ONLY the JSON array, no additional text or markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response
    let recipes;
    try {
      // Try to extract JSON if wrapped in markdown code blocks
      const jsonMatch =
        text.match(/```json\s*([\s\S]*?)\s*```/) ||
        text.match(/```\s*([\s\S]*?)\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;

      recipes = JSON.parse(jsonText.trim());

      // Ensure recipes is an array
      if (!Array.isArray(recipes)) {
        recipes = [recipes];
      }
    } catch (parseError) {
      console.error("Failed to parse JSON response:", text);

      // Fallback: Try to create a simple recipe structure from the text
      recipes = [
        {
          name: "Generated Recipe",
          description: "AI-generated recipe based on your ingredients",
          cookTime: "Varies",
          servings: "2-4",
          ingredients: ingredients.split(",").map((ing) => ing.trim()),
          instructions: text
            .split("\n")
            .filter((line) => line.trim().length > 0),
        },
      ];
    }

    // Validate and clean up the recipes
    const validRecipes = recipes.map((recipe, index) => ({
      name: recipe.name || `Recipe ${index + 1}`,
      description: recipe.description || "",
      cookTime: recipe.cookTime || "Not specified",
      servings: recipe.servings || "Not specified",
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions
        : [],
    }));

    return validRecipes.slice(0, numberOfRecipes);
  } catch (error) {
    console.error("Error generating recipes:", error);

    if (error.message.includes("API key")) {
      throw new Error(
        "Invalid API key. Please check your Gemini API key configuration."
      );
    }

    throw new Error("Failed to generate recipes. Please try again.");
  }
};
