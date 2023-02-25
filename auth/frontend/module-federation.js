const { dependencies } = require("./package.json");

module.exports = {
  name: "auth",
  filename: "authRemoteEntry.js",
  exposes: {
    "./Module": "./src/index.js",
  },
  shared: dependencies,
};
