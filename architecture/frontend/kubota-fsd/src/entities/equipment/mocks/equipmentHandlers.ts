import { equipmentDb } from "@/entities/equipment/mocks/equipmentDb"
import { createMswGet } from "@/shared/lib/fixtures"

export const equipmentHandlers = [createMswGet("/api/equipment", equipmentDb)]
