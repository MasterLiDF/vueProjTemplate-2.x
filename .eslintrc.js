module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  rules: {
    'vue/no-unused-components': 'off',
    'no-unused-vars': 'off',
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
}
