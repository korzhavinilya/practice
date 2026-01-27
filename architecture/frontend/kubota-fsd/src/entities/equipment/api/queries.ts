import type { Equipment } from "@/entities/equipment/model/types"
import { baseApi } from "@/shared/api"

export const equipmentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getEquipmentList: builder.query<Equipment[], void>({
      query: () => ({
        url: "/api/equipment",
        method: "GET",
      }),
      providesTags: ["Equipment"],
    }),
  }),
  overrideExisting: true,
})
