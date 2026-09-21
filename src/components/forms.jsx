import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { radius, resolveColorStyle, spacing } from '../tokens';

export function TextField({ label, value, onChangeText, placeholder, disabled = false, error, theme = 'light', colorStyle, style, ...inputProps }) {
  const palette = resolveColorStyle(theme, colorStyle);
  return (
    <View style={[styles.field, style]}>
      {label ? <Text style={[styles.label, { color: palette.text }]}>{label}</Text> : null}
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={palette.mutedText} editable={!disabled} style={[styles.input, { color: palette.text, backgroundColor: palette.background, borderColor: error ? palette.danger : palette.border }, disabled && styles.inputDisabled]} {...inputProps} />
      {error ? <Text accessibilityRole="alert" style={[styles.error, { color: palette.danger }]}>{error}</Text> : null}
    </View>
  );
}

/** A small dependency-free select menu for React Native and react-native-web. */
export function SelectField({ label, value, options = [], onChange, placeholder = 'Select an option', disabled = false, theme = 'light', colorStyle, style }) {
  const [open, setOpen] = useState(false);
  const palette = resolveColorStyle(theme, colorStyle);
  const selected = options.find((option) => option.value === value);
  return (
    <View style={[styles.field, style]}>
      {label ? <Text style={[styles.label, { color: palette.text }]}>{label}</Text> : null}
      <Pressable disabled={disabled} accessibilityRole="button" accessibilityLabel={selected?.label ?? placeholder} accessibilityState={{ expanded: open, disabled }} onPress={() => setOpen((current) => !current)} style={({ pressed, hovered }) => [styles.select, { backgroundColor: palette.background, borderColor: palette.border }, disabled && styles.inputDisabled, (pressed || hovered) && styles.hovered]}>
        <Text style={{ color: selected ? palette.text : palette.mutedText }}>{selected?.label ?? placeholder}</Text><Text style={{ color: palette.mutedText }}>⌄</Text>
      </Pressable>
      {open ? <View style={[styles.menu, { backgroundColor: palette.background, borderColor: palette.border }]}>{options.map((option) => <Pressable key={option.value} accessibilityRole="menuitem" onPress={() => { onChange?.(option.value); setOpen(false); }} style={({ pressed, hovered }) => [styles.option, (pressed || hovered) && { backgroundColor: palette.surface }]}><Text style={{ color: palette.text }}>{option.label}</Text></Pressable>)}</View> : null}
    </View>
  );
}

export function SubmitButton({ label = 'Submit', onPress, disabled = false, variant = 'primary', theme = 'light', colorStyle, style }) {
  const palette = resolveColorStyle(theme, colorStyle);
  const secondary = variant === 'secondary';
  return <Pressable disabled={disabled} accessibilityRole="button" accessibilityState={{ disabled }} onPress={onPress} style={({ pressed, hovered }) => [styles.button, { backgroundColor: secondary ? palette.background : palette.primary, borderColor: palette.primary }, secondary && styles.secondary, disabled && { backgroundColor: palette.disabled, borderColor: palette.disabled }, (pressed || hovered) && !disabled && styles.hovered, style]}><Text style={[styles.buttonText, { color: secondary ? palette.primary : palette.primaryText }]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  field: { gap: spacing.xs }, label: { fontSize: 14, fontWeight: '600' }, input: { minHeight: 46, paddingHorizontal: spacing.md, borderWidth: 1, borderRadius: radius.md, fontSize: 16 }, inputDisabled: { opacity: 0.5 }, error: { fontSize: 13 },
  select: { minHeight: 46, paddingHorizontal: spacing.md, borderWidth: 1, borderRadius: radius.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, menu: { marginTop: spacing.xs, borderWidth: 1, borderRadius: radius.md, overflow: 'hidden' }, option: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, minHeight: 42, justifyContent: 'center' },
  button: { minHeight: 46, paddingHorizontal: spacing.lg, borderRadius: radius.md, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }, secondary: { backgroundColor: 'transparent' }, hovered: { opacity: 0.78 }, buttonText: { fontSize: 16, fontWeight: '700' },
});
