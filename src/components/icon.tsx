import { type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { radius, resolveColorStyle, spacing } from '../tokens';

type IconLinkProps = {
  colorStyle?: Record<string, string>;
  disabled?: boolean;
  icon: ReactNode;
  kind?: 'social' | 'navigation' | 'action';
  label: string;
  onPress: () => void;
  showLabel?: boolean;
  style?: StyleProp<ViewStyle>;
  theme?: 'light' | 'dark';
};

type IconLinkGroupProps = {
  children: ReactNode;
  direction?: 'row' | 'column';
  style?: StyleProp<ViewStyle>;
};

/**
 * An accessible social, navigation, or action link with a custom icon slot.
 */
export function IconLink({
  colorStyle,
  disabled = false,
  icon,
  kind = 'action',
  label,
  onPress,
  showLabel = false,
  style,
  theme = 'light',
}: IconLinkProps) {
  const palette = resolveColorStyle(theme, colorStyle);
  const kindStyle = getKindStyle(kind);

  return (
    <Pressable
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      onPress={onPress}
      style={(pressState) => [
        styles.link,
        kindStyle,
        {
          backgroundColor: palette.background,
          borderColor: palette.border,
        },
        (pressState.pressed || isHovered(pressState)) && {
          backgroundColor: palette.surface,
          borderColor: palette.primary,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      <View pointerEvents="none" style={styles.icon}>
        {typeof icon === 'string' ? (
          <Text style={[styles.glyph, { color: palette.primary }]}>
            {icon}
          </Text>
        ) : (
          icon
        )}
      </View>
      {showLabel ? (
        <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
      ) : null}
    </Pressable>
  );
}

/** Align multiple IconLink elements as a social or action cluster. */
export function IconLinkGroup({
  children,
  direction = 'row',
  style,
}: IconLinkGroupProps) {
  return (
    <View
      style={[styles.group, direction === 'column' && styles.column, style]}
    >
      {children}
    </View>
  );
}

function getKindStyle(kind: IconLinkProps['kind']) {
  if (kind === 'social') return styles.social;
  if (kind === 'navigation') return styles.navigation;
  return styles.action;
}

function isHovered(pressState: unknown) {
  return (pressState as { hovered?: boolean }).hovered === true;
}

export type { IconLinkGroupProps, IconLinkProps };

const styles = StyleSheet.create({
  action: {},
  column: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  disabled: {
    opacity: 0.42,
  },
  glyph: {
    fontSize: 20,
    fontWeight: '700',
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  link: {
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: spacing.sm,
  },
  navigation: {
    borderRadius: radius.sm,
  },
  social: {
    borderRadius: radius.pill,
  },
});
