import { createElement, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { radius, resolveColorStyle, spacing } from '../tokens';

type MenuItem = {
  disabled?: boolean;
  id: string;
  label: string;
  onPress: () => void;
};

type MenuProps = {
  colorStyle?: Record<string, string>;
  items: MenuItem[];
  label?: string;
  openOnHover?: boolean;
  style?: StyleProp<ViewStyle>;
  theme?: 'light' | 'dark';
  variant?: 'horizontal' | 'vertical' | 'hamburger';
};

/**
 * Navigation menu with horizontal, vertical, hamburger, and hover-open modes.
 */
export function Menu({
  colorStyle,
  items,
  label = 'Open navigation menu',
  openOnHover = false,
  style,
  theme = 'light',
  variant = 'horizontal',
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const palette = resolveColorStyle(theme, colorStyle);
  const isHamburger = variant === 'hamburger';
  const shouldShowItems = !isHamburger || isOpen;

  const menuContent = (
    <>
      {isHamburger ? (
        <Pressable
          accessibilityLabel={label}
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen }}
          onPress={() => setIsOpen((currentOpen) => !currentOpen)}
          style={(pressState) => [
            styles.trigger,
            {
              backgroundColor: palette.background,
              borderColor: palette.border,
            },
            (pressState.pressed || isHovered(pressState)) && styles.active,
          ]}
        >
          <Text style={[styles.triggerIcon, { color: palette.primary }]}>
            ☰
          </Text>
          <Text style={[styles.triggerLabel, { color: palette.text }]}>
            Menu
          </Text>
        </Pressable>
      ) : null}

      {shouldShowItems ? (
        <View
          style={[
            styles.menu,
            variant === 'horizontal' ? styles.horizontal : styles.vertical,
            isHamburger && [
              styles.dropdown,
              {
                backgroundColor: palette.background,
                borderColor: palette.border,
              },
            ],
          ]}
        >
          {items.map((item) => (
            <Pressable
              key={item.id}
              disabled={item.disabled}
              accessibilityRole="link"
              accessibilityState={{ disabled: item.disabled }}
              onPress={() => {
                item.onPress();
                if (isHamburger) setIsOpen(false);
              }}
              style={(pressState) => [
                styles.item,
                (pressState.pressed || isHovered(pressState)) && {
                  backgroundColor: palette.surface,
                },
                item.disabled && styles.disabled,
              ]}
            >
              <Text style={[styles.itemLabel, { color: palette.text }]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </>
  );

  if (openOnHover && isHamburger && Platform.OS === 'web') {
    return createElement(
      'div',
      {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
        style: styles.webContainer,
      },
      menuContent,
    );
  }

  return <View style={[styles.container, style]}>{menuContent}</View>;
}

function isHovered(pressState: unknown) {
  return (pressState as { hovered?: boolean }).hovered === true;
}

export type { MenuItem, MenuProps };

const styles = StyleSheet.create({
  active: {
    opacity: 0.72,
  },
  container: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
  disabled: {
    opacity: 0.42,
  },
  dropdown: {
    alignSelf: 'flex-start',
    borderRadius: radius.md,
    borderWidth: 1,
    left: 0,
    marginTop: spacing.xs,
    minWidth: 176,
    padding: spacing.xs,
    position: 'absolute',
    top: 44,
    zIndex: 3,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderRadius: radius.sm,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  menu: {
    gap: spacing.xs,
  },
  trigger: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  triggerIcon: {
    fontSize: 20,
    fontWeight: '700',
  },
  triggerLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  vertical: {
    alignItems: 'stretch',
  },
  webContainer: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
});
