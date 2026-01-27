export enum FeatureName {
  INTELL_ATTACH = "Intell-Attach",
  ACCESS_SHARING = "Access-Sharing",
  SINGLE_SIGN_ON = "Single-Sign-On",
  SUBSCRIPTIONS = "Subscriptions",
}

interface BannerAd {
  title?: string
  description?: string
  buttonLabel?: string
  buttonUrl?: string
  imageUrl?: string
  startDate?: string
  endDate?: string
}

interface AdSettings {
  locale?: string
  smallBannerAd?: BannerAd
  largeBannerAd?: BannerAd
}

export interface Settings {
  ad?: AdSettings
  disabledFeatureFlags: FeatureName[]
  minVersionAndroid: string
  minVersionIOS: string
}
