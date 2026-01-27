export class FixtureSingleton<T extends object> {
  private data: T;

  constructor(initialData: T) {
    this.data = { ...initialData };
  }

  get(): T {
    return this.data;
  }

  update(updates: Partial<T>): T {
    this.data = { ...this.data, ...updates };
    return this.data;
  }

  set(newData: T): T {
    this.data = newData;
    return this.data;
  }
}
