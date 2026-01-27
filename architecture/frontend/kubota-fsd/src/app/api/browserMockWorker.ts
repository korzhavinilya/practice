import { equipmentHandlers } from "@/entities/equipment"
import { settingsHandlers } from "@/entities/settings"
import { setupWorker } from "msw/browser"

const handlers = [...equipmentHandlers, ...settingsHandlers]
export const browserMockWorker = setupWorker(...handlers)
