import de from "./de";
import en from "./en";

export const resources = {
  en,
  de,
} as const;

export type SupportedLanguages = keyof typeof resources;
export type TranslationResources = typeof resources;
