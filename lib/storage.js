export function safeWindow() {
  return typeof window !== 'undefined' ? window : undefined;
}

export function loadFromStorage(key, fallback) {
  const w = safeWindow();
  if (!w) return fallback;
  try {
    const raw = w.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  const w = safeWindow();
  if (!w) return;
  try {
    w.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2, 10);
}

export function nowIso() {
  return new Date().toISOString();
}

export const TRAINS_KEY = 'railtrack:trains';
export const SCHEDULES_KEY = 'railtrack:schedules';

export const getTrains = () => loadFromStorage(TRAINS_KEY, []);
export const saveTrains = (trains) => saveToStorage(TRAINS_KEY, trains);

export const getSchedules = () => loadFromStorage(SCHEDULES_KEY, []);
export const saveSchedules = (schedules) => saveToStorage(SCHEDULES_KEY, schedules);
