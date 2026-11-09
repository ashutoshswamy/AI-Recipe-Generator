import React, { useState } from "react";
import { generateRecipes } from "../services/geminiService";
import {
  ChefHat,
  Sparkles,
  RotateCcw,
  Clock,
  Users,
  Github,
  Linkedin,
  Globe,
  AlertCircle,
  Minus,
  Plus,
  Sun,
  Moon,
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

const clampCount = (n) => Math.max(1, Math.min(10, n));

const systemDark = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const RecipeGenerator = () => {
  const [theme, setTheme] = useState(() => {
    const set = document.documentElement.getAttribute("data-theme");
    return set || (systemDark() ? "dark" : "light");
  });

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  };

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
    <div className="rg">
      <div className="rg-shell">
        <aside className="rg-side">
          <div className="rg-brand">
            <ChefHat size={18} aria-hidden="true" />
            <span>Recipe Box</span>
            <button
              type="button"
              className="rg-theme"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <header className="rg-head">
            <h1>AI Recipe Generator</h1>
            <p>Type what&rsquo;s in the fridge. Pick a meal. Get recipes.</p>
          </header>

          <form onSubmit={handleSubmit} className="rg-form" noValidate>
            <fieldset className="rg-field">
              <legend>Meal</legend>
              <div className="rg-meals">
                {MEAL_TYPES.map((meal) => (
                  <button
                    key={meal}
                    type="button"
                    className={`rg-chip${mealType === meal ? " is-on" : ""}`}
                    onClick={() => setMealType(meal)}
                    disabled={loading}
                    aria-pressed={mealType === meal}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="rg-field">
              <label htmlFor="ingredients">Ingredients on hand</label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="chicken, tomatoes, garlic, pasta, cheese..."
                rows="4"
                disabled={loading}
                aria-describedby={error ? "rg-error" : undefined}
                aria-invalid={error && !ingredients.trim() ? "true" : undefined}
              />
            </div>

            <div className="rg-field rg-count">
              <label htmlFor="numberOfRecipes">Recipes to pull</label>
              <div className="rg-stepper">
                <button
                  type="button"
                  onClick={() => setNumberOfRecipes(clampCount(numberOfRecipes - 1))}
                  disabled={loading || numberOfRecipes <= 1}
                  aria-label="Fewer recipes"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  id="numberOfRecipes"
                  value={numberOfRecipes}
                  onChange={(e) =>
                    setNumberOfRecipes(clampCount(parseInt(e.target.value) || 1))
                  }
                  min="1"
                  max="10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setNumberOfRecipes(clampCount(numberOfRecipes + 1))}
                  disabled={loading || numberOfRecipes >= 10}
                  aria-label="More recipes"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="rg-actions">
              <button type="submit" className="rg-btn rg-btn-primary" disabled={loading}>
                <Sparkles size={18} />
                {loading ? "Cooking..." : "Generate recipes"}
              </button>
              <button
                type="button"
                className="rg-btn rg-btn-quiet"
                onClick={handleReset}
                disabled={loading}
              >
                <RotateCcw size={16} />
                Clear
              </button>
            </div>
          </form>
        </aside>

        <main className="rg-main" aria-live="polite">
          {error && (
            <div className="rg-error" id="rg-error" role="alert">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="rg-results" aria-busy="true">
              <p className="rg-status">Firing up the stove, pulling recipes together...</p>
              {Array.from({ length: Math.min(numberOfRecipes, 3) }).map((_, i) => (
                <div className="rg-card rg-skeleton" key={i} aria-hidden="true">
                  <span className="sk sk-title" />
                  <span className="sk sk-line" />
                  <span className="sk sk-line short" />
                </div>
              ))}
            </div>
          )}

          {!loading && recipes.length === 0 && !error && (
            <div className="rg-empty">
              <h2>Your recipes land here.</h2>
              <p>List a few ingredients and choose how many options you want to compare.</p>
            </div>
          )}

          {recipes.length > 0 && (
            <section className="rg-results" aria-label="Generated recipes">
              <h2 className="rg-count-title">
                {recipes.length} recipe{recipes.length > 1 ? "s" : ""} for {mealType.toLowerCase()}
              </h2>
              {recipes.map((recipe, index) => (
                <article
                  key={index}
                  className="rg-card"
                  style={{ "--i": index }}
                >
                  <div className="rg-card-top">
                    <span className="rg-num">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{recipe.name}</h3>
                      {recipe.description && (
                        <p className="rg-desc">{recipe.description}</p>
                      )}
                      {(recipe.servings || recipe.cookTime) && (
                        <div className="rg-meta">
                          {recipe.cookTime && (
                            <span>
                              <Clock size={15} /> {recipe.cookTime}
                            </span>
                          )}
                          {recipe.servings && (
                            <span>
                              <Users size={15} /> {recipe.servings} servings
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rg-body">
                    <div className="rg-block">
                      <h4>Ingredients</h4>
                      <ul>
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rg-block">
                      <h4>Method</h4>
                      <ol>
                        {recipe.instructions.map((instruction, idx) => (
                          <li key={idx}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </main>
      </div>

      <footer className="rg-footer">
        <p>
          Made by <strong>Ashutosh Swamy</strong>
        </p>
        <nav className="rg-links" aria-label="Social links">
          <a href="https://github.com/ashutoshswamy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/ashutoshswamy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
          <a href="https://x.com/ashutoshswamy_" target="_blank" rel="noopener noreferrer" aria-label="X">
            <XLogo size={16} />
            <span>X</span>
          </a>
          <a href="https://ashutoshswamy.in" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
            <Globe size={16} />
            <span>Portfolio</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default RecipeGenerator;
