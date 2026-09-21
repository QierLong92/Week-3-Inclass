# Week-3-Inclass
yc branch
# Week 3 Inclass Component Library

A small React Native component library with browser-based Storybook documentation.

## Components

- `Header` and `Footer` with light/dark and compact responsive presentations
- `List` with numbered, bulleted, checklist, and accessible reordering modes
- `TextField`, `SelectField`, and `SubmitButton` form controls

All components accept `theme="light" | "dark"` and an optional `colorStyle`
object. `colorStyle` overrides the theme for that instance, for example:

```jsx
<SubmitButton
  label="Save"
  colorStyle={{ primary: '#8136A8', primaryText: '#FFFFFF' }}
/>
```

## Local development

Requires Node 22.13 or newer.

```sh
npm install
npm run storybook
```

## Quality checks

```sh
npm run verify
npm run build-storybook
npm pack --dry-run
```

## Install from GitHub

After creating a release tag, a separate Expo app can install this library:

```sh
npm install github:QierLong92/Week-3-Inclass#v1.0.0
```

Import only from the package boundary:

```jsx
import { Header, List, SubmitButton } from 'week-3-inclass';
```
