const { url } = require("inspector");
const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  prefix: "confirmbutton-",
  ...sharedConfig,
  plugins: [],
};
