const STORAGE_KEY = "kanban-board";

export function loadFromStorage<T>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveToStorage<T>(data: T) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // fail silently or report to monitoring
  }
}
