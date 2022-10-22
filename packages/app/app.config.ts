import "dotenv/config";

export default {
  expo: {
    name: "notifica-ufba-v2",
    slug: "notifica-ufba-v2",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/40b5b6cf-6fef-4d26-b431-b2577f3ef390"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.notifica_ufba",
      versionCode: 1,
      softwareKeyboardLayoutMode: "pan",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "40b5b6cf-6fef-4d26-b431-b2577f3ef390"
      },
      API_URL: process.env.API_URL
    },
    runtimeVersion: {
      policy: "sdkVersion"
    },
    plugins: ["sentry-expo"]
  }
};
