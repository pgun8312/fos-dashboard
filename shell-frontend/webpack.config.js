const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3000/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell_frontend",
      filename: "remoteEntry.js",
      remotes: {
        user_dashboard: "user_dashboard@http://localhost:3002/remoteEntry.js",
        admin_dashboard: "admin_dashboard@http://localhost:3001/remoteEntry.js",
        shell_frontend: "shell_frontend@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        "./MainLayout":
          "./src/MainLayout.jsx" /* to expose the the redux store and the routing */,
        "./ProtectedRoute":
          "./src/components/layout/ProtectedRoute.jsx" /* Route Protection */,
        "./RootLayout":
          "./src/components/layout/RootLayout.jsx" /* to expost the theming and root level store values */,
        "./DashboardLayout":
          "./src/components/layout/DashboardLayout.jsx" /* Dashbaord layout */,
        "./store": "./src/store/store.js",
        "./Carousel": "./src/components/Carousel/Carousel.jsx",
      },
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
