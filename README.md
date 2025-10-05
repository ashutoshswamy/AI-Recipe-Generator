# 🍳 AI Recipe Generator

An intelligent recipe generator powered by Google's Gemini AI that creates delicious recipes based on the ingredients you have at home.

🌐 **Live Demo:** [https://ai-recipe-generator.netlify.app](https://ai-recipe-generator.netlify.app)

## ✨ Features

- **Ingredient-Based Recipe Generation**: Enter your available ingredients and get personalized recipes
- **Customizable Output**: Choose how many recipes you want to generate (1-10)
- **Detailed Recipes**: Each recipe includes:
  - Recipe name and description
  - Complete ingredient list with quantities
  - Step-by-step cooking instructions
  - Cooking time and servings information
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Easy to Use**: Simple and intuitive interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd ai-recipe-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env
   ```

4. Get your Gemini API key:

   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

5. Add your API key to `.env`:

   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

6. Start the development server:

   ```bash
   npm start
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Use

1. **Enter Ingredients**: Type in the ingredients you have available (comma-separated)

   - Example: `chicken, tomatoes, garlic, pasta, cheese`

2. **Select Number of Recipes**: Choose how many recipes you want (1-10)

3. **Generate**: Click the "Generate Recipes" button

4. **Enjoy**: Browse through your personalized recipes with complete instructions!

## 🛠️ Built With

- **React** - Frontend framework
- **Google Gemini AI** - AI-powered recipe generation
- **CSS3** - Styling and animations

## 📁 Project Structure

```
ai-recipe-generator/
├── src/
│   ├── components/
│   │   ├── RecipeGenerator.js      # Main component
│   │   └── RecipeGenerator.css     # Component styles
│   ├── services/
│   │   └── geminiService.js        # Gemini API integration
│   ├── App.js                       # Root component
│   ├── App.css                      # Global styles
│   └── index.js                     # Entry point
├── .env.example                     # Environment variables template
├── package.json                     # Dependencies
└── README.md                        # This file
```

## 🔑 Environment Variables

- `REACT_APP_GEMINI_API_KEY`: Your Google Gemini API key (required)

## 🎨 Features in Detail

### Recipe Generation

- Uses Google's Gemini Pro model for high-quality recipe generation
- Intelligent parsing of ingredients and creation of complete recipes
- Fallback mechanisms for robust error handling

### User Interface

- Responsive design that works on desktop and mobile
- Loading indicators for better user experience
- Error messages with helpful feedback
- Beautiful gradient backgrounds and smooth animations

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powering the recipe generation
- Create React App for the initial project setup

## 🌐 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add your environment variable in Netlify dashboard:
   - Key: `REACT_APP_GEMINI_API_KEY`
   - Value: Your Gemini API key
4. Deploy!

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variable in Vercel dashboard
4. Deploy!

## � Security

- Never commit your `.env` file to version control
- Keep your API key secure and rotate it regularly
- Use environment variables for all sensitive data
- The app includes CSP headers for enhanced security

## 🚀 Performance Optimizations

- Responsive design for all device types
- Optimized CSS with media queries for mobile, tablet, and desktop
- Touch-friendly interfaces for mobile devices
- Reduced motion support for accessibility
- Print-friendly styles for recipe printing
- Service worker ready for PWA capabilities

## �📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

## 👨‍💻 Developer

**Ashutosh Swamy**

- GitHub: [@ashutoshswamy](https://github.com/ashutoshswamy)
- LinkedIn: [ashutoshswamy](https://linkedin.com/in/ashutoshswamy)

---

Made with ❤️ by Ashutosh Swamy
