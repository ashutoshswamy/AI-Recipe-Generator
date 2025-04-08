import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import { Github, Linkedin } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI
  ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  : null;

const App = () => {
  const [ingredients, setIngredients] = useState("");
  const [numRecipes, setNumRecipes] = useState(3);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!ingredients.trim()) {
      toast.error("Please enter some ingredients.");
      return;
    }

    if (!apiKey) {
      toast.error(
        "API key is missing. Please set your REACT_APP_GEMINI_API_KEY in the environment variables."
      );
      return;
    }

    setLoading(true);
    try {
      const prompt = `I have these ingredients: ${ingredients}. Suggest me ${numRecipes} healthy and delicious recipes. 
      Provide the output in the following format:
      Recipe Name: <Recipe Name>
      Ingredients: <List of Ingredients>
      Instructions: <Step-by-step instructions>`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      const recipeArray = responseText
        .split(/Recipe Name:/)
        .slice(1)
        .map((recipe) => "Recipe Name:" + recipe.trim());

      setRecipes(recipeArray);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error(
        "Failed to fetch recipes. Please check your API key and try again!"
      );
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" />
      <h1>AI Recipe Generator</h1>

      <div className="input-section">
        <textarea
          className="input-box"
          rows="3"
          placeholder="Enter ingredients (comma-separated)..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        ></textarea>

        <div className="controls">
          <label>Number of recipes:</label>
          <input
            type="number"
            className="num-input"
            value={numRecipes}
            min="1"
            max="10"
            onChange={(e) => setNumRecipes(parseInt(e.target.value) || 1)}
          />
        </div>

        <button onClick={fetchRecipes} disabled={loading} className="btn">
          {loading ? "Fetching..." : "Get Recipes"}
        </button>
      </div>

      {recipes.length > 0 && (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-box">
              <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>
          ))}
        </div>
      )}

      <footer className="developer-info">
        <p>Developed by Ashutosh Swamy</p>
        <div className="social-icons">
          <a
            href="https://github.com/ashutoshswamy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/ashutoshswamy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
