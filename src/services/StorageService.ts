export class StorageService<T> {
  constructor(public readonly key: string) {}

  public get(): T | null {
    const value = localStorage.getItem(this.key);
    return value ? JSON.parse(value) : null;
  }

  public set(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public remove() {
    localStorage.removeItem(this.key);
  }
}
