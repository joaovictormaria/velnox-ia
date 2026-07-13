import globals from "globals";
import pluginJs from "@eslint/js";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import nextConfig from "eslint-config-next";

const sharedRules = {
  "no-unused-vars": "off",
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": [
    "warn",
    {
      vars: "all",
      varsIgnorePattern: "^_",
      args: "after-used",
      argsIgnorePattern: "^_",
    },
  ],
};

export default [
  ...nextConfig,
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    ...pluginJs.configs.recommended,
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "unused-imports": pluginUnusedImports,
    },
    rules: {
      ...sharedRules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
