// eslint.config.js
import globals from "globals";
import js from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
      "space-before-function-paren": ["error", "always"], // Example rule to add space before function parens
      "space-in-parens": ["error", "always"], // Add spaces inside parentheses
      "space-before-blocks": ["error", "always"],// Add space before blocks
      "block-spacing": ["error", "always"]
    }
  }
];
