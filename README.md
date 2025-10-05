# 🍳 AI Recipe Generator

An intelligent recipe generator powered by Google's Gemini AI that creates delicious recipes based on the ingredients you have at home.

🌐 **Live Demo:** [https://recipesbyai.netlify.app](https://recipesbyai.netlify.app)

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

## ️ Built With

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
