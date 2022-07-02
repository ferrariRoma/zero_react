const path = require("path");

module.exports = {
  name: "gugudan",
  mode: "development", // 실서비스 production
  devtool: "eval", // 빠르게 하겠다는 의미?..
  watch: true,
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: ["./client"],
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    clean: true,
  }, // 출력
};
