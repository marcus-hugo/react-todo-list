const path = require("path")
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "src")
    },
    hot: true,
    liveReload: false,
    historyApiFallback: { index: "index.html" }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      }
    ]
  }
}
