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

/*
mainKey : {
  subKey: {value}
  ...
}
*/
export class ListStorageService<T> {
  constructor(public readonly mainKey: string) {}

  public set(subKey: string, value: T) {
    const items = this.getParsedItems();
    if (!items) {
      localStorage.setItem(this.mainKey, JSON.stringify({ [subKey]: value }));
      return;
    }
    items[subKey] = value;
    localStorage.setItem(this.mainKey, JSON.stringify(items));
  }

  public get(subKey: string): T | null {
    const itemsJSON = localStorage.getItem(this.mainKey);
    if (!itemsJSON) return null;

    const items = JSON.parse(itemsJSON);
    if (!items[subKey]) return null;

    return items[subKey];
  }

  public remove() {
    localStorage.removeItem(this.mainKey);
  }

  private getParsedItems() {
    const itemsJSON = localStorage.getItem(this.mainKey);
    return itemsJSON ? JSON.parse(itemsJSON) : null;
  }
}
