# Theming System

Project Chowky uses a comprehensive theming system built on CSS custom properties and the OKLCH color space for consistent, accessible colors across light and dark modes.

## Overview

The theming system provides:
- **OKLCH Color Space**: Perceptually uniform colors for better contrast and accessibility
- **Automatic Dark Mode**: Seamless switching between light and dark themes
- **Purple Color Scheme**: Modern purple-based color palette with semantic color tokens
- **Customizable**: Easy to modify colors through CSS custom properties

## Color Palette

### Primary Colors
```css
/* Light Mode */
--primary: oklch(0.3 0.15 270);           /* Deep purple */
--primary-foreground: oklch(0.985 0 0);    /* White text */

/* Dark Mode */
--primary: oklch(0.8 0.15 270);           /* Light purple */
--primary-foreground: oklch(0.15 0.05 270); /* Dark purple text */
```

### Accent Colors
```css
/* Light Mode */
--accent: oklch(0.96 0.02 280);           /* Very light purple */
--accent-foreground: oklch(0.3 0.15 270); /* Deep purple text */

/* Dark Mode */
--accent: oklch(0.25 0.08 280);           /* Dark purple */
--accent-foreground: oklch(0.985 0 0);     /* White text */
```

### Chart Colors
The theming system includes 5 purple-based chart colors for data visualization:
```css
--chart-1: oklch(0.646 0.222 270);  /* Primary purple */
--chart-2: oklch(0.6 0.18 290);     /* Purple-magenta */
--chart-3: oklch(0.55 0.15 250);    /* Blue-purple */
--chart-4: oklch(0.7 0.12 310);     /* Purple-pink */
--chart-5: oklch(0.65 0.16 240);    /* Indigo-purple */
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

## OKLCH Color Space

OKLCH (Oklch) provides several advantages:
- **Perceptual Uniformity**: Colors with the same lightness appear equally bright
- **Better Contrast**: More predictable contrast ratios
- **Wide Gamut**: Access to more vibrant colors
- **Future-Proof**: Modern color space with growing browser support

### OKLCH Format
```
oklch(lightness chroma hue)
```
- **Lightness**: 0-1 (0 = black, 1 = white)
- **Chroma**: 0+ (0 = gray, higher = more saturated)
- **Hue**: 0-360 degrees (270 = purple, 280 = magenta)

## Customizing the Theme

### Changing the Color Scheme

To change from purple to another color, modify the hue values in `apps/web/src/index.css`:

```css
/* Example: Change to blue (hue ~240) */
:root {
  --primary: oklch(0.3 0.15 240);
  --accent: oklch(0.96 0.02 250);
  /* ... update other purple colors */
}

.dark {
  --primary: oklch(0.8 0.15 240);
  --accent: oklch(0.25 0.08 250);
  /* ... update other purple colors */
}
```

### Adding New Color Tokens

1. Add the CSS custom property:
```css
:root {
  --my-custom-color: oklch(0.6 0.15 270);
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

Use consistent lightness and chroma values for related colors:
```css
/* Primary color family */
--primary-50: oklch(0.95 0.02 270);   /* Very light */
--primary-100: oklch(0.9 0.05 270);   /* Light */
--primary-500: oklch(0.6 0.15 270);   /* Base */
--primary-900: oklch(0.2 0.12 270);   /* Very dark */
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
**Contrast problems**: Check OKLCH lightness values and test with accessibility tools
**Theme not persisting**: Verify `storageKey` and `ThemeProvider` setup
**Dark mode not working**: Check `.dark` class application and CSS selector specificity

### Testing Tools
- Browser DevTools for color inspection
- WCAG Color Contrast Analyzer
- Accessible Colors online tool
- ColorBrewer for palette generation