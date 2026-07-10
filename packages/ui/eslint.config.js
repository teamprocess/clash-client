import reactConfig from "@clash/eslint-config/react";

export default [
  ...reactConfig,
  {
    files: ["src/theme.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
