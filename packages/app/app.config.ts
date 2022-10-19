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
      url: "https://u.expo.dev/da53ce08-1795-4e29-b51f-24a667e5ddab"
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
        projectId: "da53ce08-1795-4e29-b51f-24a667e5ddab"
      },
      API_URL: process.env.API_URL
    },
    runtimeVersion: {
      policy: "sdkVersion"
    }
  }
};
