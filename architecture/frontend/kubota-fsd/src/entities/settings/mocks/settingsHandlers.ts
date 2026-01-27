import { settingsDb } from "@/entities/settings/mocks/settingsDb"
import { createMswGetSingleton, createMswPatchSingleton } from "@/shared/lib"

export const settingsHandlers = [
  createMswGetSingleton("/api/settings", settingsDb),
  createMswPatchSingleton("/api/settings", settingsDb),
]
