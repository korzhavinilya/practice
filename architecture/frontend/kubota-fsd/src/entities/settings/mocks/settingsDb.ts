import type { Settings } from "@/entities/settings/model/types"
import { FeatureName } from "@/entities/settings/model/types"
import { FixtureSingleton } from "@/shared/lib"

const settings: Settings = {
  minVersionIOS: "1.0.0",
  minVersionAndroid: "1.0.0",
  disabledFeatureFlags: [FeatureName.SINGLE_SIGN_ON],
  ad: {},
}

export const settingsDb = new FixtureSingleton(settings)
