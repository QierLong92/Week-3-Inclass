import { Pressable, StyleSheet, Text, View } from 'react-native';
import { resolveColorStyle, spacing } from '../tokens';

/** Footer that stacks naturally on narrow/mobile screens with `compact`. */
export function Footer({ brand = 'Your brand', links = [], theme = 'light', colorStyle, compact = false, style }) {
  const palette = resolveColorStyle(theme, colorStyle);
  return (
    <View style={[styles.footer, compact && styles.compact, { backgroundColor: palette.surface, borderTopColor: palette.border }, style]}>
      <Text style={[styles.brand, { color: palette.text }]}>{brand}</Text>
      <View style={[styles.links, compact && styles.compactLinks]}>
        {links.map((link) => (
          <Pressable key={link.label} accessibilityRole="link" onPress={link.onPress} style={({ pressed, hovered }) => [styles.link, (pressed || hovered) && styles.linkActive]}>
            <Text style={[styles.linkText, { color: palette.mutedText }]}>{link.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { padding: spacing.lg, borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  compact: { flexDirection: 'column', alignItems: 'flex-start' },
  brand: { fontSize: 14, fontWeight: '700' },
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  compactLinks: { gap: spacing.sm },
  link: { paddingVertical: spacing.xs },
  linkActive: { opacity: 0.6 },
  linkText: { fontSize: 14 },
});
