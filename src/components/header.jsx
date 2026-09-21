import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, resolveColorStyle, spacing } from '../tokens';

/**
 * A responsive navigation header. Set `surface="transparent"` while it sits
 * over hero content, then change it to `solid` after the page is scrolled.
 */
export function Header({
  title,
  subtitle,
  theme = 'light',
  colorStyle,
  surface = 'solid',
  compact = false,
  leftAction,
  rightAction,
  style,
}) {
  const palette = resolveColorStyle(theme, colorStyle);
  const transparent = surface === 'transparent';

  return (
    <View
      style={[
        styles.header,
        compact && styles.compactHeader,
        {
          backgroundColor: transparent ? 'transparent' : palette.background,
          borderBottomColor: transparent ? 'transparent' : palette.border,
        },
        style,
      ]}
    >
      <HeaderAction action={leftAction} color={palette.text} />
      <View style={styles.titleBlock}>
        <Text numberOfLines={1} style={[styles.title, { color: palette.text }]}>{title}</Text>
        {!compact && subtitle ? <Text style={[styles.subtitle, { color: palette.mutedText }]}>{subtitle}</Text> : null}
      </View>
      <HeaderAction action={rightAction} color={palette.text} align="right" />
    </View>
  );
}

function HeaderAction({ action, color, align }) {
  if (!action) return <View style={styles.actionSlot} />;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={action.label}
      onPress={action.onPress}
      style={({ pressed, hovered }) => [styles.action, align === 'right' && styles.actionRight, (pressed || hovered) && styles.actionActive]}
    >
      <Text style={[styles.actionText, { color }]}>{action.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 72, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth },
  compactHeader: { minHeight: 52 },
  titleBlock: { flex: 1, alignItems: 'center', minWidth: 0 },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { fontSize: 12, marginTop: spacing.xs },
  actionSlot: { width: 64 },
  action: { width: 64, minHeight: 40, justifyContent: 'center', borderRadius: radius.sm },
  actionRight: { alignItems: 'flex-end' },
  actionActive: { opacity: 0.62 },
  actionText: { fontSize: 14, fontWeight: '600' },
});
