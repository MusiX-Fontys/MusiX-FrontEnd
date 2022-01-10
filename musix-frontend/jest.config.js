module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.{js,vue}", "!**/src/main.js", "!**/src/router/index.js", "!**/src/pages/**", "!**/src/wrappers/**", "!**/node_modules/**", "!**/dist/**", "!**/coverage/**"]
}
