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
  Globe,
  AlertCircle,
} from "lucide-react";
import "./RecipeGenerator.css";

const XLogo = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MEAL_TYPES = ["Breakfast", "Brunch", "Lunch", "Dinner", "Snack", "Dessert"];

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("Dinner");
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
        numberOfRecipes,
        mealType
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
    setMealType("Dinner");
    setNumberOfRecipes(3);
    setRecipes([]);
    setError("");
  };

  return (
    <div className="recipe-generator">
      <div className="container">
        <header className="header">
          <div className="header-tab">
            <ChefHat size={16} />
            <span>Recipe Box</span>
          </div>
          <h1>AI Recipe Generator</h1>
          <p className="subhead">
            Type what&rsquo;s in the fridge. Pick a meal. Get recipes.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="index-card input-card">
          <span className="punch punch-left" aria-hidden="true" />
          <span className="punch punch-right" aria-hidden="true" />

          <div className="form-group">
            <label id="meal-type-label">Meal</label>
            <div
              className="meal-tabs"
              role="group"
              aria-labelledby="meal-type-label"
            >
              {MEAL_TYPES.map((meal) => (
                <button
                  key={meal}
                  type="button"
                  className={`meal-tab${mealType === meal ? " active" : ""}`}
                  onClick={() => setMealType(meal)}
                  disabled={loading}
                  aria-pressed={mealType === meal}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <div className="field-heading">
              <label htmlFor="ingredients">Ingredients on hand</label>
              <div className="recipe-count">
                <label htmlFor="numberOfRecipes">Recipes to pull</label>
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
            </div>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="chicken, tomatoes, garlic, pasta, cheese..."
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              <Sparkles size={18} />
              {loading ? "Cooking..." : "Generate recipes"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleReset}
              disabled={loading}
            >
              <RotateCcw size={18} />
              Clear card
            </button>
          </div>
        </form>

        {error && (
          <div className="ticket ticket-error">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="ticket ticket-loading">
            <span className="typing-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <p>Firing up the stove, pulling recipes together...</p>
          </div>
        )}

        {recipes.length > 0 && (
          <section className="recipe-box">
            <h2 className="box-label">
              Your recipe box{" "}
              <span>
                ({recipes.length} card{recipes.length > 1 ? "s" : ""})
              </span>
            </h2>
            <div className="recipes-grid">
              {recipes.map((recipe, index) => (
                <article
                  key={index}
                  className="index-card recipe-card"
                  style={{ "--tilt": index % 2 === 0 ? "-1deg" : "1deg" }}
                >
                  <span className="punch punch-left" aria-hidden="true" />
                  <span className="punch punch-right" aria-hidden="true" />
                  <span className="card-no">
                    No. {String(index + 1).padStart(3, "0")}
                  </span>

                  <h3>{recipe.name}</h3>

                  {recipe.description && (
                    <p className="recipe-description">{recipe.description}</p>
                  )}

                  <div className="recipe-section">
                    <h4>
                      <ListChecks size={16} /> Ingredients
                    </h4>
                    <ul className="mono-list">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="recipe-section">
                    <h4>
                      <Utensils size={16} /> Method
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
                          <Clock size={14} /> {recipe.cookTime}
                        </span>
                      )}
                      {recipe.servings && (
                        <span className="footer-item">
                          <Users size={14} /> {recipe.servings} servings
                        </span>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="app-footer">
          <div className="receipt">
            <p className="footer-text">
              Made by <strong>Ashutosh Swamy</strong>
            </p>
            <div className="social-links">
              <a
                href="https://github.com/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://x.com/ashutoshswamy_"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="X"
              >
                <XLogo size={16} />
                <span>X</span>
              </a>
              <a
                href="https://ashutoshswamy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Portfolio"
              >
                <Globe size={16} />
                <span>Portfolio</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RecipeGenerator;
