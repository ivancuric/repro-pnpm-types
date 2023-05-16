const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,

  rules: {
    "@typescript-eslint/no-unused-vars": 0,
  },
  parserOptions: {
    ecmaVersion: "2022",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "solid"],
      parser: "@typescript-eslint/parser",
      // have to duplicate in override...
      rules: {
        "@typescript-eslint/no-unused-vars": 0,
        // the following two are causing errors in vscode. See:
        // https://typescript-eslint.io/linting/troubleshooting/#changes-to-one-file-are-not-reflected-when-linting-other-files-in-my-ide
        "@typescript-eslint/no-unsafe-assignment": 0,
        "@typescript-eslint/no-unsafe-member-access": 0,
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      extends: [
        "eslint:recommended",
        "plugin:solid/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
      ],
    },
    {
      files: ["**/*.{js,mjs,cjs}"],
      env: {
        node: true,
        browser: true,
        es2021: true,
      },
      extends: ["eslint:recommended"],
      rules: {
        "no-unused-vars": 0,
      },
    },
  ],
});
