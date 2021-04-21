module.exports = {
  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    parser: "@typescript-eslint/parser",
  },

  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],

  plugins: ["@typescript-eslint"],

  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },
};
