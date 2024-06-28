import pluginJs from "@eslint/js";

export default {
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      extends: ["eslint:recommended", pluginJs.configs.recommended],
      rules: {
        // Add any JavaScript specific rules here
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
      },
    },
  ],
};
