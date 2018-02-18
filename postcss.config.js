const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    autoprefixer("last 10 version")
  ]
};
