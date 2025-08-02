# Theming System

Project Chowky uses a comprehensive theming system built on CSS custom properties with hex color values for consistent, accessible colors across light and dark modes.

## Overview

The theming system provides:
- **Hex Color Values**: Familiar and easy-to-use color format
- **Automatic Dark Mode**: Seamless switching between light and dark themes
- **Custom Color Scheme**: Beautiful purple-pink color palette with semantic color tokens
- **Customizable**: Easy to modify colors through CSS custom properties

## Color Palette

### Primary Colors
```css
/* Light Mode */
--primary: #7f55b1;           /* Custom purple */
--primary-foreground: #ffffff; /* White text */

/* Dark Mode */
--primary: #9b7ebd;           /* Lighter purple for dark mode */
--primary-foreground: #1a0a2e; /* Dark purple text */
```

### Accent Colors
```css
/* Light Mode */
--accent: #f49bab;            /* Custom pink */
--accent-foreground: #ffffff; /* White text */

/* Dark Mode */
--accent: #8b495c;            /* Darker pink for dark mode */
--accent-foreground: #ffffff; /* White text */
```

### Chart Colors
The theming system includes 5 custom chart colors for data visualization:
```css
/* Light Mode */
--chart-1: #7f55b1;  /* Primary purple */
--chart-2: #9b7ebd;  /* Light purple */
--chart-3: #f49bab;  /* Pink accent */
--chart-4: #ffe1e0;  /* Very light pink */
--chart-5: #8a4fbe;  /* Purple variant */
```

## Theme Provider

The app uses a `ThemeProvider` component that handles:
- System theme detection
- Manual theme switching
- Local storage persistence
- CSS class application

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  disableTransitionOnChange
  storageKey="vite-ui-theme"
>
  {/* App content */}
</ThemeProvider>
```

## Color Tokens

### Semantic Colors
- `background` / `foreground` - Main background and text colors
- `card` / `card-foreground` - Card background and text
- `popover` / `popover-foreground` - Popover/dropdown styling
- `primary` / `primary-foreground` - Primary brand colors
- `secondary` / `secondary-foreground` - Secondary accent colors
- `muted` / `muted-foreground` - Subtle backgrounds and text
- `accent` / `accent-foreground` - Highlighted elements
- `destructive` - Error/warning states
- `border` - Border colors
- `input` - Form input styling
- `ring` - Focus ring colors

### Sidebar Colors
- `sidebar` / `sidebar-foreground` - Sidebar background and text
- `sidebar-primary` / `sidebar-primary-foreground` - Sidebar primary elements
- `sidebar-accent` / `sidebar-accent-foreground` - Sidebar accents
- `sidebar-border` / `sidebar-ring` - Sidebar borders and focus rings

## Hex Color System

The theme uses standard hex color values for simplicity and familiarity:
- **Easy to Use**: Standard 6-digit hex format (#RRGGBB)
- **Widely Supported**: Universal browser compatibility
- **Designer Friendly**: Easy to use with design tools
- **Readable**: Clear and familiar color representation

### Color Format
```
#RRGGBB
```
- **RR**: Red component (00-FF)
- **GG**: Green component (00-FF)  
- **BB**: Blue component (00-FF)

### Your Custom Palette
- `#7F55B1` - Primary purple
- `#9B7EBD` - Light purple (muted elements)
- `#F49BAB` - Pink accent
- `#FFE1E0` - Very light pink (secondary)

## Customizing the Theme

### Changing the Color Scheme

To change colors, simply update the hex values in `apps/web/src/index.css`:

```css
/* Example: Change to blue theme */
:root {
  --primary: #2563eb;        /* Blue primary */
  --accent: #60a5fa;         /* Light blue accent */
  --secondary: #dbeafe;      /* Very light blue */
  --muted: #93c5fd;          /* Blue muted */
  /* ... update other colors */
}

.dark {
  --primary: #60a5fa;        /* Lighter blue for dark mode */
  --accent: #3b82f6;         /* Darker blue accent */
  /* ... update other colors */
}
```

### Adding New Color Tokens

1. Add the CSS custom property:
```css
:root {
  --my-custom-color: #7c3aed;
}
```

2. Add to the Tailwind theme mapping:
```css
@theme inline {
  --color-my-custom: var(--my-custom-color);
}
```

3. Use in components:
```tsx
<div className="bg-my-custom text-my-custom-foreground">
  Custom colored element
</div>
```

### Creating Color Variants

Use tints and shades of your base colors for variants:
```css
/* Primary color family example */
--primary-50: #f5f3ff;    /* Very light tint */
--primary-100: #ede9fe;   /* Light tint */
--primary-500: #7f55b1;   /* Base color */
--primary-900: #3c1a5b;   /* Dark shade */
```

## Accessibility

The theming system follows WCAG guidelines:
- **Contrast Ratios**: All text meets AA standards (4.5:1 minimum)
- **Focus Indicators**: Clear focus rings with sufficient contrast
- **Dark Mode**: Reduces eye strain in low-light conditions
- **System Preferences**: Respects user's OS theme preference

## Implementation Details

### File Structure
```
apps/web/src/
├── index.css                 # Theme definitions
├── components/
│   └── theme-provider.tsx   # Theme context and switching
└── lib/
    └── utils.ts            # Theme utilities (if needed)
```

### CSS Architecture
1. **CSS Custom Properties**: Root-level color definitions
2. **Tailwind Integration**: Automatic class generation from properties
3. **Dark Mode**: `.dark` class overrides for dark theme
4. **Radius Variables**: Consistent border radius scale

## Best Practices

### Color Usage
- Use semantic tokens (`primary`, `secondary`) over direct colors
- Maintain consistent contrast ratios across themes
- Test both light and dark modes thoroughly
- Consider color accessibility for users with color vision deficiencies

### Performance
- CSS custom properties are efficient and fast
- Avoid inline styles; use Tailwind classes
- Theme switching is instantaneous with no FOUC (Flash of Unstyled Content)

### Maintenance
- Keep color definitions centralized in `index.css`
- Document any custom color additions
- Test theme changes across all components
- Validate contrast ratios when modifying colors

## Troubleshooting

### Common Issues

**Colors not updating**: Ensure proper CSS cascade and specificity
**Contrast problems**: Check color contrast ratios with accessibility tools
**Theme not persisting**: Verify `storageKey` and `ThemeProvider` setup
**Dark mode not working**: Check `.dark` class application and CSS selector specificity

### Testing Tools
- Browser DevTools for color inspection
- WCAG Color Contrast Analyzer
- WebAIM Contrast Checker
- Coolors.co for palette generation