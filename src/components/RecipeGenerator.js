import React, { useState } from "react";
import { generateRecipes } from "../services/geminiService";
import {
  ChefHat,
  Sparkles,
  RotateCcw,
  Clock,
  Users,
  ListChecks,
  Utensils,
  Github,
  Linkedin,
  Heart,
} from "lucide-react";
import "./RecipeGenerator.css";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [numberOfRecipes, setNumberOfRecipes] = useState(3);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const generatedRecipes = await generateRecipes(
        ingredients,
        numberOfRecipes
      );
      setRecipes(generatedRecipes);
    } catch (err) {
      setError(
        err.message ||
          "Failed to generate recipes. Please check your API key and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIngredients("");
    setNumberOfRecipes(3);
    setRecipes([]);
    setError("");
  };

  return (
    <div className="recipe-generator">
      <div className="container">
        <header className="header">
          <h1>
            <ChefHat size={48} className="header-icon" /> AI Recipe Generator
          </h1>
          <p>
            Enter your ingredients and let AI create delicious recipes for you!
          </p>
        </header>

        <form onSubmit={handleSubmit} className="input-form">
          <div className="form-group">
            <label htmlFor="ingredients">Your Ingredients:</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., chicken, tomatoes, garlic, pasta, cheese..."
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfRecipes">Number of Recipes:</label>
            <input
              type="number"
              id="numberOfRecipes"
              value={numberOfRecipes}
              onChange={(e) =>
                setNumberOfRecipes(
                  Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
                )
              }
              min="1"
              max="10"
              disabled={loading}
            />
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              <Sparkles size={20} />
              {loading ? "Generating..." : "Generate Recipes"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={loading}
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cooking up some recipes for you...</p>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="recipes-container">
            <h2>Your Recipes ({recipes.length})</h2>
            <div className="recipes-grid">
              {recipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <div className="recipe-header">
                    <h3>{recipe.name}</h3>
                  </div>

                  {recipe.description && (
                    <p className="recipe-description">{recipe.description}</p>
                  )}

                  <div className="recipe-section">
                    <h4>
                      <ListChecks size={20} /> Ingredients:
                    </h4>
                    <ul>
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="recipe-section">
                    <h4>
                      <Utensils size={20} /> Instructions:
                    </h4>
                    <ol>
                      {recipe.instructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ol>
                  </div>

                  {(recipe.servings || recipe.cookTime) && (
                    <div className="recipe-footer">
                      {recipe.cookTime && (
                        <span className="footer-item">
                          <Clock size={18} /> {recipe.cookTime}
                        </span>
                      )}
                      {recipe.servings && (
                        <span className="footer-item">
                          <Users size={18} /> {recipe.servings} servings
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="app-footer">
          <div className="footer-content">
            <p className="footer-text">
              Made with <Heart size={16} className="heart-icon" /> by{" "}
              <strong>Ashutosh Swamy</strong>
            </p>
            <div className="social-links">
              <a
                href="https://github.com/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RecipeGenerator;
