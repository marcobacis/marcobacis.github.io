const localStorageKey = 'theme';
const themeAttribute = 'data-theme';

const html = document.documentElement;

export function initializeTheme(): void {
    const initialTheme = getThemePreference();
    console.log(`Initializing theme: ${initialTheme}`);
    setTheme(initialTheme);
}

export function toggleTheme(): void {
    const currentTheme = getThemePreference();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(newTheme: string): void {
    html.setAttribute(themeAttribute, newTheme);
    localStorage.setItem(localStorageKey, newTheme);
}

function getThemePreference(): string {
    const storedTheme = localStorage.getItem(localStorageKey);
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemPreference;
    return initialTheme;
}