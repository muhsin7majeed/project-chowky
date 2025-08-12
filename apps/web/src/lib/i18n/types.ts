import type { resources } from "./locales";

// Create type-safe translation keys
type TranslationKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object ? `${string & K}:${TranslationKeys<T[K]>}` : `${string & K}:${string & K}`;
    }[keyof T]
  : never;

export type TranslationKey = TranslationKeys<(typeof resources)["en"]>;

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: (typeof resources)["en"];
  }
}
