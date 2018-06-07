// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent':'off',
    //  禁用行尾空格
    'no-trailing-spaces': 0,
    // 不允许多个空行
    'no-multiple-empty-lines': [2, { "max": 2 }],
    //ignore semicolon
    //"semi": [1, "always"],
    'no-labels': 0,
    'no-unused-expressions':0,
    'space-infix-ops':0,
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false,'unexpected-character-in-attribute-name':false }] 
  }
}
