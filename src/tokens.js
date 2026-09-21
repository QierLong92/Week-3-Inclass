/** Shared visual decisions for the Week 3 component library. */
export const colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F7F8FA',
    text: '#172033',
    mutedText: '#5E6B82',
    border: '#D8DEEA',
    primary: '#2855D9',
    primaryText: '#FFFFFF',
  },
  dark: {
    background: '#111827',
    surface: '#1F2937',
    text: '#F8FAFC',
    mutedText: '#C5CEDC',
    border: '#3A475B',
    primary: '#8EABFF',
    primaryText: '#101827',
  },
  danger: '#C93636',
  disabled: '#AAB4C4',
  checked: '#1C8C57',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const radius = { sm: 6, md: 12, pill: 999 };

/**
 * Creates a component palette from a built-in theme and optional per-instance
 * overrides. Every public component accepts this object as `colorStyle`.
 */
export function resolveColorStyle(theme = 'light', colorStyle = {}) {
  return {
    ...colors.light,
    ...colors[theme],
    danger: colors.danger,
    disabled: colors.disabled,
    checked: colors.checked,
    ...colorStyle,
  };
}
