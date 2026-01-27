import type { Settings } from "@/entities/settings/model/types"
import { baseApi } from "@/shared/api"

export const settingsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSettings: builder.query<Settings, void>({
      query: () => ({
        url: "/api/settings",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
  }),
  overrideExisting: true,
})
