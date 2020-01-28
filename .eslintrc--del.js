module.exports = {
  // Настройки проекта.
  'env': {
    // Проект для браузера.
    'browser': true,
    // Включить возможности ES6.
    'es6': true,
    // Добавить возможности ES2017.
    'es2017': true,
  },
  // Наборы правил.
  'extends': [
    // Базовый набор правил eslint.
    'eslint:recommended',
    // Отключить правила из базового набора.
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  // Движок парсинга.
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    // Плагин с наборами правил для TypeScript.
    '@typescript-eslint',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
  },
};
