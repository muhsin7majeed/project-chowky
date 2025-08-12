# Internationalization (i18n) Structure

This directory contains the modular internationalization setup for the Project Chowky web application.

## Structure

```
i18n/
├── locales/
│   ├── en/                 # English translations
│   │   ├── common.ts       # Common UI elements, actions, form labels
│   │   ├── app.ts          # Application-specific content
│   │   ├── auth.ts         # Authentication related
│   │   ├── todos.ts        # Todo feature
│   │   ├── admin.ts        # Admin section
│   │   ├── categories.ts   # Category management
│   │   ├── products.ts     # Product management
│   │   └── index.ts        # Aggregate all English translations
│   ├── de/                 # German translations (same structure)
│   └── index.ts            # Export all locales and types
├── types.ts                # TypeScript definitions for type-safe translations
└── README.md               # This file
```

## Adding New Languages

1. Create a new directory under `locales/` (e.g., `locales/fr/`)
2. Copy the structure from `locales/en/`
3. Translate all the content
4. Add the import to `locales/index.ts`

Example:
```typescript
// locales/index.ts
import en from "./en";
import de from "./de";
import fr from "./fr"; // New language

export const resources = {
  en,
  de,
  fr, // Add here
} as const;
```

## Adding New Translation Keys

1. Add the key to the appropriate English namespace file (`locales/en/*.ts`)
2. Add the corresponding translation to all other language files
3. Use the translation in your components with the namespace:

```typescript
// For common translations (default namespace)
const { t } = useTranslation();
t("save"); // Gets from common.ts

// For specific namespaces
const { t } = useTranslation("products");
t("createProduct"); // Gets from products.ts
```

## Translation Namespaces

- **common**: UI elements, actions, form labels, error messages
- **app**: Application-specific content, themes, welcome messages
- **auth**: Authentication related translations
- **todos**: Todo feature specific
- **admin**: Admin section general
- **categories**: Category management
- **products**: Product management

## Type Safety

The setup includes TypeScript types for translation keys, providing:
- Autocomplete for translation keys
- Compile-time errors for missing translations
- IntelliSense support in IDEs

## Best Practices

1. **Keep translations organized**: Use appropriate namespaces
2. **Consistent naming**: Use descriptive, consistent key names
3. **Avoid hardcoded text**: Always use translation keys
4. **Test all languages**: Verify translations work in all supported locales
5. **Context-aware keys**: Use specific keys rather than generic ones when context matters

## Configuration

The i18n configuration is in `/src/lib/i18n.ts` and includes:
- Language detection (localStorage, browser, HTML tag)
- Fallback to English
- Development debugging
- Namespace configuration
