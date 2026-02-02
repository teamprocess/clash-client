export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "hotfix", "docs", "style", "refactor", "test", "chore", "revert", "delete"],
    ],
    "subject-case": [0],
  },
};
