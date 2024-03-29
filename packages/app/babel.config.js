module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@": "./src",
            "@shared": "../shared/src"
          }
        }
      ]
    ]
  };
};
