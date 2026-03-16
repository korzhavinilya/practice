import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    // 1. Подписка
    (callback) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    // 2. Как получить значение на клиенте
    () => window.matchMedia(query).matches,
    // 3. Значение для сервера (SSR)
    () => false,
  )
}
