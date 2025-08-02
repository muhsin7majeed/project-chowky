import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
	en: {
		translation: {
			// Navigation
			dashboard: "Dashboard",
			todos: "Todos",
			login: "Login",
			logout: "Logout",

			// Common
			welcome: "Welcome",
			home: "Home",
			loading: "Loading...",
			save: "Save",
			cancel: "Cancel",
			delete: "Delete",
			edit: "Edit",
			add: "Add",
			search: "Search",
			language: "Language",

			// Application specific
			projectTitle: "Project Chowky",
			projectDescription: "A modern web application built with Better-T-Stack",

			// Todos
			addTodo: "Add Todo",
			todoTitle: "Todo Title",
			todoDescription: "Todo Description",
			completed: "Completed",
			pending: "Pending",
			noTodos: "No todos found",
			createFirstTodo: "Create your first todo",

			// Auth
			signIn: "Sign In",
			signUp: "Sign Up",
			signOut: "Sign Out",
			username: "Username",
			password: "Password",
			email: "Email",

			// Theme
			lightMode: "Light Mode",
			darkMode: "Dark Mode",
			systemMode: "System",

			// Messages
			welcomeMessage: "Welcome to Project Chowky",
			getStarted: "Get started by creating your first todo",
		},
	},
	de: {
		translation: {
			// Navigation
			dashboard: "Dashboard",
			todos: "Aufgaben",
			login: "Anmelden",
			logout: "Abmelden",

			// Common
			welcome: "Willkommen",
			home: "Startseite",
			loading: "Laden...",
			save: "Speichern",
			cancel: "Abbrechen",
			delete: "Löschen",
			edit: "Bearbeiten",
			add: "Hinzufügen",
			search: "Suchen",
			language: "Sprache",

			// Application specific
			projectTitle: "Project Chowky",
			projectDescription: "Eine moderne Webanwendung, erstellt mit Better-T-Stack",

			// Todos
			addTodo: "Aufgabe hinzufügen",
			todoTitle: "Aufgabentitel",
			todoDescription: "Aufgabenbeschreibung",
			completed: "Abgeschlossen",
			pending: "Ausstehend",
			noTodos: "Keine Aufgaben gefunden",
			createFirstTodo: "Erstelle deine erste Aufgabe",

			// Auth
			signIn: "Anmelden",
			signUp: "Registrieren",
			signOut: "Abmelden",
			username: "Benutzername",
			password: "Passwort",
			email: "E-Mail",

			// Theme
			lightMode: "Heller Modus",
			darkMode: "Dunkler Modus",
			systemMode: "System",

			// Messages
			welcomeMessage: "Willkommen bei Project Chowky",
			getStarted: "Beginne mit der Erstellung deiner ersten Aufgabe",
		},
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		debug: process.env.NODE_ENV === "development",

		// Language detection options
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			lookupLocalStorage: "i18nextLng",
			caches: ["localStorage"],
		},

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},

		// Namespace configuration
		defaultNS: "translation",
		ns: ["translation"],
	});

export default i18n;