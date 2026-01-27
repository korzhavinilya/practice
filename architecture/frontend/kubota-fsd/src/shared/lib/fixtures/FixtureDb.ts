import { keyBy, merge } from "lodash-es"

type IdSelector<T> = keyof T | ((item: T) => string)

export class FixtureDb<T extends object> {
  public ids: string[]
  public entities: Record<string, T>
  private getId: (item: T) => string

  constructor(data: T[], idSelector: IdSelector<T> = "id" as keyof T) {
    if (typeof idSelector === "function") {
      this.getId = idSelector
    } else {
      this.getId = item => String(item[idSelector])
    }

    this.ids = data.map(this.getId)
    this.entities = keyBy(data, this.getId)
  }

  find(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate)
  }

  getAll(): T[] {
    return this.ids
      .map(id => this.entities[id])
      .filter((item): item is T => item !== undefined)
  }

  getById(id: string): T | undefined {
    return this.entities[id]
  }

  create(item: T): T {
    const id = this.getId(item)
    if (this.entities[id]) {
      throw new Error(`Entity with id ${id} already exists`)
    }
    this.ids.push(id)
    this.entities[id] = item
    return item
  }

  update(id: string, updates: Partial<T>): T | null {
    const item = this.entities[id]
    if (!item) return null

    const updatedItem = merge({}, item, updates)

    this.entities[id] = updatedItem
    return updatedItem
  }

  delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: _, ...remainingEntities } = this.entities
    this.entities = remainingEntities
    this.ids = this.ids.filter(itemId => itemId !== id)
    return true
  }
}
