const react = require("@vitejs/plugin-react")
const path = require("path")

module.exports = {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    deps: {
      moduleDirectories: [path.resolve('../../packages'), 'node_modules'],
    }
  },
}
