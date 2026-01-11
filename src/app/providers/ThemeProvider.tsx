import {
	createContext,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react"

export type Theme = "light" | "dark"

type ThemeContextValue = {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "kanban-theme"

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
		if (stored === "light" || stored === "dark") return stored

		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light"
	})

	const applyThemeToDOM = useCallback((theme: Theme) => {
		const root = document.documentElement
		root.classList.toggle("dark", theme === "dark")
	}, [])

	useLayoutEffect(() => {
		applyThemeToDOM(theme)
	}, [theme, applyThemeToDOM])

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, theme)
	}, [theme])

	const setTheme = useCallback((next: Theme) => {
		setThemeState(next)
	}, [])

	const toggleTheme = useCallback(() => {
		setThemeState((t) => (t === "dark" ? "light" : "dark"))
	}, [])

	const value = useMemo(
		() => ({ theme, setTheme, toggleTheme }),
		[theme, setTheme, toggleTheme]
	)

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	)
}
