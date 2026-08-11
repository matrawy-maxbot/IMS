# Internationalization (i18n) Usage Guide

This application uses `next-intl` for internationalization with support for Arabic (ar) and English (en) languages.

## Features

- ✅ Two languages: Arabic (default) and English
- ✅ Automatic RTL/LTR direction switching
- ✅ Language toggle in the header
- ✅ Type-safe translations
- ✅ Cookie-based language persistence

## How to Use Translations in Your Components

### In Client Components

```tsx
"use client";

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');
  
  return (
    <div>
      <button>{t('save')}</button>
      <button>{t('cancel')}</button>
    </div>
  );
}
```

### Using Multiple Namespaces

```tsx
"use client";

import { useTranslations } from 'next-intl';

export function Dashboard() {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{tCommon('save')}</button>
    </div>
  );
}
```

### Getting Current Locale

```tsx
"use client";

import { useLocale } from 'next-intl';

export function MyComponent() {
  const locale = useLocale(); // Returns 'ar' or 'en'
  
  return <div>Current language: {locale}</div>;
}
```

### Using Direction Utilities

```tsx
"use client";

import { useDirection, useIsRTL } from '@/lib/i18n-utils';

export function MyComponent() {
  const direction = useDirection(); // Returns 'rtl' or 'ltr'
  const isRTL = useIsRTL(); // Returns boolean
  
  return (
    <div dir={direction}>
      {isRTL ? 'Arabic Layout' : 'English Layout'}
    </div>
  );
}
```

## Translation Files

Translation files are located in `src/i18n/messages/`:

- `ar.json` - Arabic translations
- `en.json` - English translations

### Structure

```json
{
  "common": {
    "search": "Search...",
    "save": "Save",
    "cancel": "Cancel"
  },
  "nav": {
    "dashboard": "Dashboard",
    "products": "Products"
  },
  "dashboard": {
    "title": "Dashboard",
    "welcome": "Welcome"
  }
}
```

## Adding New Translations

1. Add the translation key to both `ar.json` and `en.json`
2. Use the translation in your component with `useTranslations()`

Example:

**ar.json:**
```json
{
  "products": {
    "newProduct": "منتج جديد"
  }
}
```

**en.json:**
```json
{
  "products": {
    "newProduct": "New Product"
  }
}
```

**Component:**
```tsx
const t = useTranslations('products');
<button>{t('newProduct')}</button>
```

## Language Switching

Users can switch languages using the language toggle button in the header (top-left corner with a Languages icon). The selected language is stored in a cookie and persists across sessions.

## Default Language

The default language is Arabic (ar) with RTL direction. If no language cookie is set, the application will default to Arabic.

## Type Safety

The application uses TypeScript for type-safe translations. The types are automatically inferred from the English translation file (`en.json`).

## Notes

- The language toggle will reload the page to apply the new language and direction
- All text content should use translations for consistency
- Icons and images do not require translation
- Numbers and dates may need locale-specific formatting (can be added as needed)
