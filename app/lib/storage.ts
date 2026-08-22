const setItem = (storage: Storage, key: string, value: string | object): void => {
  if (typeof window === 'undefined') return;

  const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
  storage.setItem(key, valueToStore);
};

const getItem = <T>(storage: Storage, key: string): T | null => {
  if (typeof window === 'undefined') return null;

  const item = storage.getItem(key);
  if (item === null) return null;

  try {
    return JSON.parse(item) as T;
  } catch (_) {
    return item as unknown as T;
  }
};

export const itemStorage = {
  local: {
    set: (key: string, value: string | object) => setItem(window.localStorage, key, value),
    get: <T>(key: string): T | null => getItem<T>(window.localStorage, key),
    remove: (key: string) => typeof window !== 'undefined' && window.localStorage.removeItem(key),
    clear: () => typeof window !== 'undefined' && window.localStorage.clear(),
  },
  session: {
    set: (key: string, value: string | object) => setItem(window.sessionStorage, key, value),
    get: <T>(key: string): T | null => getItem<T>(window.sessionStorage, key),
    remove: (key: string) => typeof window !== 'undefined' && window.sessionStorage.removeItem(key),
    clear: () => typeof window !== 'undefined' && window.sessionStorage.clear(),
  },
};
