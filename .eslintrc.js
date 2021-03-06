module.exports = {
  root: true,
  "extends": "airbnb",
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "globals": {
    "fetch": false,
    "__DEV__": false
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "strict": 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "jsx-quotes": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".tsx"] }],
    "global-require": "off",
    "no-console": "warn",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/accessible-emoji": "off",
    "react/no-unescaped-entities": "off",
    "no-underscore-dangle": "off",
    "prefer-promise-reject-errors": "off",
    "no-nested-ternary": "off",
    "react/no-multi-comp": "off",
    "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
    "no-use-before-define": ["error", { "variables": false }],
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "no-restricted-syntax": "off",
    "no-continue": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
  },
};
