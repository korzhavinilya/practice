import type { FixtureDb, FixtureSingleton } from "@/shared/lib/fixtures"
import type { PathParams } from "msw"
import { HttpResponse, delay, http } from "msw"
import { v4 as uuidv4 } from "uuid"

const APP_API_ORIGIN = import.meta.env.VITE_API_URL

export const getMswPath = (path: string) => {
  return `${APP_API_ORIGIN}${path}`
}

export function createMswGetSingleton<T extends object>(
  path: string,
  fixture: FixtureSingleton<T>,
) {
  return http.get(getMswPath(path), async () => {
    await delay(2000)
    return HttpResponse.json(fixture.get())
  })
}

export function createMswPostSingleton<T extends object>(
  path: string,
  fixture: FixtureSingleton<T>,
) {
  return http.post(getMswPath(path), async ({ request }) => {
    const newItem = (await request.json()) as T
    fixture.set(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  })
}

export function createMswPatchSingleton<T extends object>(
  path: string,
  fixture: FixtureSingleton<T>,
) {
  return http.patch(getMswPath(path), async ({ request }) => {
    const updates = (await request.json()) as Partial<T>
    const updatedData = fixture.update(updates)
    return HttpResponse.json(updatedData)
  })
}

export function createMswGet<T extends object>(
  path: string,
  fixture: FixtureDb<T>,
) {
  return http.get(getMswPath(path), async () => {
    await delay(2000)
    return HttpResponse.json(fixture.getAll())
  })
}

export function createMswGetById<T extends object>(
  path: string,
  fixture: FixtureDb<T>,
) {
  return http.get(getMswPath(path), ({ params }) => {
    const { id } = params
    const item = fixture.getById(String(id))

    if (!item) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(item)
  })
}

export function createMswListEndpoint<T extends object>(
  path: string,
  query: (params: PathParams, db: FixtureDb<T>) => T[],
  fixture: FixtureDb<T>,
) {
  return http.get(getMswPath(path), ({ params }) => {
    const result = query(params, fixture)
    return HttpResponse.json(result)
  })
}

export function createMswPost<
  T extends object,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  Body extends object = Omit<T, "id">,
>(
  path: string,
  fixture: FixtureDb<T>,
  options: {
    generateId?: () => string
  } = {},
) {
  return http.post(getMswPath(path), async ({ request }) => {
    const body = (await request.json()) as Body

    const newId = options.generateId ? options.generateId() : uuidv4()

    // @ts-expect-error: It's difficult to type a new object, but it must be T.
    const newItem: T = {
      ...body,
      id: newId,
    }

    fixture.create(newItem)

    return HttpResponse.json(newItem, { status: 201 })
  })
}

export function createMswPatch<T extends object>(
  path: string,
  fixture: FixtureDb<T>,
) {
  return http.patch(getMswPath(path), async ({ params, request }) => {
    const { id } = params
    const updates = (await request.json()) as Partial<T>

    const updatedItem = fixture.update(String(id), updates)

    if (!updatedItem) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(updatedItem)
  })
}

export function createMswDelete<T extends { id: string }>(
  path: string,
  fixture: FixtureDb<T>,
) {
  return http.delete(getMswPath(path), ({ params }) => {
    const { id } = params
    const success = fixture.delete(String(id))

    if (!success) {
      return new HttpResponse(null, { status: 404 })
    }
    return new HttpResponse(null, { status: 200 })
  })
}
