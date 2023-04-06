export default {
  expo: {
    name: "notifica-ufba-v2",
    slug: "notifica-ufba-v2",
    scheme: "nufba",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    updates: {
      enabled: true,
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/40b5b6cf-6fef-4d26-b431-b2577f3ef390",
      checkAutomatically: "ON_LOAD",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.iguzinho.notifica-ufba",
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      package: "com.notifica_ufba",
      versionCode: 1,
      softwareKeyboardLayoutMode: "pan",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "https",
              host: "notificaufba.page.link",
            },
            {
              scheme: "nufba",
              host: "notificaufba",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "40b5b6cf-6fef-4d26-b431-b2577f3ef390",
      },
    },
    runtimeVersion: "exposdk:46.0.0",
    plugins: [
      "sentry-expo",
      // "@notifee/react-native",
      [
        "expo-image-picker",
        {
          cameraPermission: "O aplicativo irá utilizar sua camera.",
          photosPermission: "O aplicativo irá acessar suas fotos.",
        },
      ],
    ],
  },
};
