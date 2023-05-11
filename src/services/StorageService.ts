export class StorageService {
  constructor(private readonly key: string) {}

  public get() {
    const value = localStorage.getItem(this.key);
    return value ? JSON.parse(value) : null;
  }

  public set(value: unknown) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public remove() {
    localStorage.removeItem(this.key);
  }
}
