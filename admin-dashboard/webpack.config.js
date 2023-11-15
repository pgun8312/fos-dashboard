const HtmlWebPackPlugin = require("html-webpack-plugin"); //to inject the index.html to this file
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin"); // to expose the component and create the micro frontend

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "admin_dashboard", //name of the mfe
      filename: "remoteEntry.js", //name of a file which will be imported in other mfe
      remotes: {
        shell_frontend: "shell_frontend@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        "./AdminRoutes": "./src/AdminRoutes.jsx",
      }, //code to be exported and can be used in other mfe
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
