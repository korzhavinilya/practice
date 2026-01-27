import { createMyAppRouter } from "@/app/router"
import ErrorFallback from "@/app/ui/ErrorFallback"
import GlobalLoader from "@/app/ui/GlobalLoader"
import { settingsApi } from "@/entities/settings/api/queries"
import { useMemo } from "react"
import { RouterProvider } from "react-router-dom"

export default function App() {
  const router = useMemo(() => createMyAppRouter(), [])

  const { isLoading, isError } = settingsApi.useGetSettingsQuery()

  if (isLoading) {
    return <GlobalLoader />
  }

  if (isError) {
    return <ErrorFallback />
  }

  return <RouterProvider router={router} />
}
