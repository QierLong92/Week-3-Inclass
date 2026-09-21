// src/components/header.jsx
import { Pressable, StyleSheet, Text, View } from "react-native";

// src/tokens.js
var colors = {
  light: {
    background: "#FFFFFF",
    surface: "#F7F8FA",
    text: "#172033",
    mutedText: "#5E6B82",
    border: "#D8DEEA",
    primary: "#2855D9",
    primaryText: "#FFFFFF"
  },
  dark: {
    background: "#111827",
    surface: "#1F2937",
    text: "#F8FAFC",
    mutedText: "#C5CEDC",
    border: "#3A475B",
    primary: "#8EABFF",
    primaryText: "#101827"
  },
  danger: "#C93636",
  disabled: "#AAB4C4",
  checked: "#1C8C57"
};
var spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
var radius = { sm: 6, md: 12, pill: 999 };
function resolveColorStyle(theme = "light", colorStyle = {}) {
  return {
    ...colors.light,
    ...colors[theme],
    danger: colors.danger,
    disabled: colors.disabled,
    checked: colors.checked,
    ...colorStyle
  };
}

// src/components/header.jsx
import { jsx, jsxs } from "react/jsx-runtime";
function Header({
  title,
  subtitle,
  theme = "light",
  colorStyle,
  surface = "solid",
  compact = false,
  leftAction,
  rightAction,
  style
}) {
  const palette = resolveColorStyle(theme, colorStyle);
  const transparent = surface === "transparent";
  return /* @__PURE__ */ jsxs(
    View,
    {
      style: [
        styles.header,
        compact && styles.compactHeader,
        {
          backgroundColor: transparent ? "transparent" : palette.background,
          borderBottomColor: transparent ? "transparent" : palette.border
        },
        style
      ],
      children: [
        /* @__PURE__ */ jsx(HeaderAction, { action: leftAction, color: palette.text }),
        /* @__PURE__ */ jsxs(View, { style: styles.titleBlock, children: [
          /* @__PURE__ */ jsx(Text, { numberOfLines: 1, style: [styles.title, { color: palette.text }], children: title }),
          !compact && subtitle ? /* @__PURE__ */ jsx(Text, { style: [styles.subtitle, { color: palette.mutedText }], children: subtitle }) : null
        ] }),
        /* @__PURE__ */ jsx(HeaderAction, { action: rightAction, color: palette.text, align: "right" })
      ]
    }
  );
}
function HeaderAction({ action, color, align }) {
  if (!action) return /* @__PURE__ */ jsx(View, { style: styles.actionSlot });
  return /* @__PURE__ */ jsx(
    Pressable,
    {
      accessibilityRole: "button",
      accessibilityLabel: action.label,
      onPress: action.onPress,
      style: ({ pressed, hovered }) => [styles.action, align === "right" && styles.actionRight, (pressed || hovered) && styles.actionActive],
      children: /* @__PURE__ */ jsx(Text, { style: [styles.actionText, { color }], children: action.label })
    }
  );
}
var styles = StyleSheet.create({
  header: { minHeight: 72, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, flexDirection: "row", alignItems: "center", borderBottomWidth: StyleSheet.hairlineWidth },
  compactHeader: { minHeight: 52 },
  titleBlock: { flex: 1, alignItems: "center", minWidth: 0 },
  title: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 12, marginTop: spacing.xs },
  actionSlot: { width: 64 },
  action: { width: 64, minHeight: 40, justifyContent: "center", borderRadius: radius.sm },
  actionRight: { alignItems: "flex-end" },
  actionActive: { opacity: 0.62 },
  actionText: { fontSize: 14, fontWeight: "600" }
});

// src/components/footer.jsx
import { Pressable as Pressable2, StyleSheet as StyleSheet2, Text as Text2, View as View2 } from "react-native";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Footer({ brand = "Your brand", links = [], theme = "light", colorStyle, compact = false, style }) {
  const palette = resolveColorStyle(theme, colorStyle);
  return /* @__PURE__ */ jsxs2(View2, { style: [styles2.footer, compact && styles2.compact, { backgroundColor: palette.surface, borderTopColor: palette.border }, style], children: [
    /* @__PURE__ */ jsx2(Text2, { style: [styles2.brand, { color: palette.text }], children: brand }),
    /* @__PURE__ */ jsx2(View2, { style: [styles2.links, compact && styles2.compactLinks], children: links.map((link) => /* @__PURE__ */ jsx2(Pressable2, { accessibilityRole: "link", onPress: link.onPress, style: ({ pressed, hovered }) => [styles2.link, (pressed || hovered) && styles2.linkActive], children: /* @__PURE__ */ jsx2(Text2, { style: [styles2.linkText, { color: palette.mutedText }], children: link.label }) }, link.label)) })
  ] });
}
var styles2 = StyleSheet2.create({
  footer: { padding: spacing.lg, borderTopWidth: StyleSheet2.hairlineWidth, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md },
  compact: { flexDirection: "column", alignItems: "flex-start" },
  brand: { fontSize: 14, fontWeight: "700" },
  links: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  compactLinks: { gap: spacing.sm },
  link: { paddingVertical: spacing.xs },
  linkActive: { opacity: 0.6 },
  linkText: { fontSize: 14 }
});

// src/components/list.jsx
import { createElement, useCallback, useMemo, useRef, useState } from "react";
import { PanResponder, Platform, Pressable as Pressable3, StyleSheet as StyleSheet3, Text as Text3, View as View3 } from "react-native";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function List({ items = [], variant = "bulleted", checkedIds = [], onToggleItem, onMoveItem, theme = "light", colorStyle, style }) {
  const [drag, setDrag] = useState(null);
  const itemLayouts = useRef([]);
  const palette = resolveColorStyle(theme, colorStyle);
  const isChecked = (item) => checkedIds.includes(item.id);
  const beginDrag = useCallback((index) => setDrag({ index, offset: 0, target: index }), []);
  const updateDrag = useCallback((offset) => {
    setDrag((current) => {
      if (!current) return current;
      const source = itemLayouts.current[current.index];
      if (!source) return { ...current, offset };
      const pointerCenter = source.y + source.height / 2 + offset;
      let target = current.index;
      let closestDistance = Number.POSITIVE_INFINITY;
      itemLayouts.current.forEach((layout, index) => {
        if (!layout) return;
        const distance = Math.abs(layout.y + layout.height / 2 - pointerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          target = index;
        }
      });
      return { ...current, offset, target };
    });
  }, []);
  const setDropTarget = useCallback((target) => {
    setDrag((current) => current ? { ...current, target } : current);
  }, []);
  const finishDrag = useCallback((dropTarget) => {
    setDrag((current) => {
      if (!current) return null;
      const target = Number.isInteger(dropTarget) ? dropTarget : current.target;
      if (target !== current.index) onMoveItem == null ? void 0 : onMoveItem(items[current.index], current.index, target);
      return null;
    });
  }, [items, onMoveItem]);
  return /* @__PURE__ */ jsx3(View3, { style: [styles3.list, style], children: items.map((item, index) => {
    const checked = isChecked(item);
    const dragging = (drag == null ? void 0 : drag.index) === index;
    const target = (drag == null ? void 0 : drag.target) === index && !dragging;
    const marker = variant === "numbered" ? `${index + 1}.` : variant === "checklist" ? checked ? "\u2713" : "\u25CB" : variant === "bulleted" ? "\u2022" : null;
    const row = /* @__PURE__ */ jsxs3(
      View3,
      {
        onLayout: ({ nativeEvent }) => {
          itemLayouts.current[index] = nativeEvent.layout;
        },
        style: [styles3.row, { borderColor: palette.border }, dragging && [styles3.draggingRow, { backgroundColor: palette.background, transform: [{ translateY: drag.offset }] }], target && [styles3.dropTarget, { borderColor: palette.primary }]],
        children: [
          variant === "draggable" ? /* @__PURE__ */ jsx3(DragHandle, { item, index, onBegin: beginDrag, onMove: updateDrag, onFinish: finishDrag, color: palette.primary }) : /* @__PURE__ */ jsx3(Text3, { style: [styles3.marker, { color: checked ? palette.checked : palette.primary }], children: marker }),
          /* @__PURE__ */ jsx3(Text3, { style: [styles3.itemText, checked && styles3.checked, { color: palette.text }], children: item.label }),
          variant === "draggable" ? /* @__PURE__ */ jsx3(ReorderButtons, { item, index, count: items.length, onMoveItem, color: palette.primary }) : null
        ]
      }
    );
    if (variant === "draggable" && Platform.OS === "web") {
      return /* @__PURE__ */ jsx3(WebDropZone, { index, onDragOver: setDropTarget, onDrop: finishDrag, children: row }, item.id ?? item.label);
    }
    return variant === "checklist" ? /* @__PURE__ */ jsx3(Pressable3, { accessibilityRole: "checkbox", accessibilityState: { checked }, onPress: () => onToggleItem == null ? void 0 : onToggleItem(item), style: ({ pressed, hovered }) => [(pressed || hovered) && styles3.active], children: row }, item.id ?? item.label) : /* @__PURE__ */ jsx3(View3, { children: row }, item.id ?? item.label);
  }) });
}
function DragHandle({ item, index, onBegin, onMove, onFinish, color }) {
  if (Platform.OS === "web") {
    return createElement("div", {
      "aria-label": `Drag ${item.label}`,
      draggable: true,
      onDragEnd: onFinish,
      onDragStart: (event) => {
        event.dataTransfer.effectAllowed = "move";
        onBegin(index);
      },
      role: "button",
      style: { alignItems: "center", cursor: "grab", display: "flex", justifyContent: "center", minHeight: 44, minWidth: 36 }
    }, createElement("span", { style: { color, fontSize: 20, fontWeight: 700 } }, "\u283F"));
  }
  return /* @__PURE__ */ jsx3(NativeDragHandle, { item, index, onBegin, onMove, onFinish, color });
}
function NativeDragHandle({ item, index, onBegin, onMove, onFinish, color }) {
  const responder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => onBegin(index),
    onPanResponderMove: (_, gesture) => onMove(gesture.dy),
    onPanResponderRelease: onFinish,
    onPanResponderTerminate: onFinish
  }), [index, onBegin, onFinish, onMove]);
  return /* @__PURE__ */ jsx3(View3, { ...responder.panHandlers, accessibilityLabel: `Drag ${item.label}`, accessibilityRole: "adjustable", style: styles3.dragHandle, children: /* @__PURE__ */ jsx3(Text3, { style: [styles3.grip, { color }], children: "\u283F" }) });
}
function WebDropZone({ children, index, onDragOver, onDrop }) {
  return createElement("div", {
    onDragOver: (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      onDragOver(index);
    },
    onDrop: (event) => {
      event.preventDefault();
      onDrop(index);
    },
    style: { position: "relative" }
  }, children);
}
function ReorderButtons({ item, index, count, onMoveItem, color }) {
  return /* @__PURE__ */ jsxs3(View3, { style: styles3.reorderControls, children: [
    /* @__PURE__ */ jsx3(Pressable3, { disabled: index === 0, accessibilityRole: "button", accessibilityLabel: `Move ${item.label} up`, onPress: () => onMoveItem == null ? void 0 : onMoveItem(item, index, index - 1), children: /* @__PURE__ */ jsx3(Text3, { style: [styles3.move, { color }, index === 0 && styles3.disabled], children: "\u2191" }) }),
    /* @__PURE__ */ jsx3(Pressable3, { disabled: index === count - 1, accessibilityRole: "button", accessibilityLabel: `Move ${item.label} down`, onPress: () => onMoveItem == null ? void 0 : onMoveItem(item, index, index + 1), children: /* @__PURE__ */ jsx3(Text3, { style: [styles3.move, { color }, index === count - 1 && styles3.disabled], children: "\u2193" }) })
  ] });
}
var styles3 = StyleSheet3.create({
  list: { gap: spacing.xs },
  row: { minHeight: 48, paddingHorizontal: spacing.sm, flexDirection: "row", alignItems: "center", borderBottomWidth: StyleSheet3.hairlineWidth },
  marker: { width: 28, fontWeight: "700", textAlign: "center" },
  itemText: { flex: 1, fontSize: 16 },
  checked: { textDecorationLine: "line-through", opacity: 0.7 },
  active: { opacity: 0.65 },
  draggingRow: { borderRadius: radius.sm, elevation: 3, opacity: 0.94, zIndex: 2 },
  dropTarget: { borderTopWidth: 2 },
  dragHandle: { alignItems: "center", justifyContent: "center", minHeight: 44, minWidth: 36, cursor: "grab" },
  grip: { fontSize: 20, fontWeight: "700" },
  reorderControls: { flexDirection: "row", gap: spacing.sm },
  move: { padding: spacing.sm, fontSize: 19, fontWeight: "700", borderRadius: radius.sm },
  disabled: { opacity: 0.3 }
});

// src/components/forms.jsx
import { useState as useState2 } from "react";
import { Pressable as Pressable4, StyleSheet as StyleSheet4, Text as Text4, TextInput, View as View4 } from "react-native";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function TextField({ label, value, onChangeText, placeholder, disabled = false, error, theme = "light", colorStyle, style, ...inputProps }) {
  const palette = resolveColorStyle(theme, colorStyle);
  return /* @__PURE__ */ jsxs4(View4, { style: [styles4.field, style], children: [
    label ? /* @__PURE__ */ jsx4(Text4, { style: [styles4.label, { color: palette.text }], children: label }) : null,
    /* @__PURE__ */ jsx4(TextInput, { value, onChangeText, placeholder, placeholderTextColor: palette.mutedText, editable: !disabled, style: [styles4.input, { color: palette.text, backgroundColor: palette.background, borderColor: error ? palette.danger : palette.border }, disabled && styles4.inputDisabled], ...inputProps }),
    error ? /* @__PURE__ */ jsx4(Text4, { accessibilityRole: "alert", style: [styles4.error, { color: palette.danger }], children: error }) : null
  ] });
}
function SelectField({ label, value, options = [], onChange, placeholder = "Select an option", disabled = false, theme = "light", colorStyle, style }) {
  const [open, setOpen] = useState2(false);
  const palette = resolveColorStyle(theme, colorStyle);
  const selected = options.find((option) => option.value === value);
  return /* @__PURE__ */ jsxs4(View4, { style: [styles4.field, style], children: [
    label ? /* @__PURE__ */ jsx4(Text4, { style: [styles4.label, { color: palette.text }], children: label }) : null,
    /* @__PURE__ */ jsxs4(Pressable4, { disabled, accessibilityRole: "button", accessibilityLabel: (selected == null ? void 0 : selected.label) ?? placeholder, accessibilityState: { expanded: open, disabled }, onPress: () => setOpen((current) => !current), style: ({ pressed, hovered }) => [styles4.select, { backgroundColor: palette.background, borderColor: palette.border }, disabled && styles4.inputDisabled, (pressed || hovered) && styles4.hovered], children: [
      /* @__PURE__ */ jsx4(Text4, { style: { color: selected ? palette.text : palette.mutedText }, children: (selected == null ? void 0 : selected.label) ?? placeholder }),
      /* @__PURE__ */ jsx4(Text4, { style: { color: palette.mutedText }, children: "\u2304" })
    ] }),
    open ? /* @__PURE__ */ jsx4(View4, { style: [styles4.menu, { backgroundColor: palette.background, borderColor: palette.border }], children: options.map((option) => /* @__PURE__ */ jsx4(Pressable4, { accessibilityRole: "menuitem", onPress: () => {
      onChange == null ? void 0 : onChange(option.value);
      setOpen(false);
    }, style: ({ pressed, hovered }) => [styles4.option, (pressed || hovered) && { backgroundColor: palette.surface }], children: /* @__PURE__ */ jsx4(Text4, { style: { color: palette.text }, children: option.label }) }, option.value)) }) : null
  ] });
}
function SubmitButton({ label = "Submit", onPress, disabled = false, variant = "primary", theme = "light", colorStyle, style }) {
  const palette = resolveColorStyle(theme, colorStyle);
  const secondary = variant === "secondary";
  return /* @__PURE__ */ jsx4(Pressable4, { disabled, accessibilityRole: "button", accessibilityState: { disabled }, onPress, style: ({ pressed, hovered }) => [styles4.button, { backgroundColor: secondary ? palette.background : palette.primary, borderColor: palette.primary }, secondary && styles4.secondary, disabled && { backgroundColor: palette.disabled, borderColor: palette.disabled }, (pressed || hovered) && !disabled && styles4.hovered, style], children: /* @__PURE__ */ jsx4(Text4, { style: [styles4.buttonText, { color: secondary ? palette.primary : palette.primaryText }], children: label }) });
}
var styles4 = StyleSheet4.create({
  field: { gap: spacing.xs },
  label: { fontSize: 14, fontWeight: "600" },
  input: { minHeight: 46, paddingHorizontal: spacing.md, borderWidth: 1, borderRadius: radius.md, fontSize: 16 },
  inputDisabled: { opacity: 0.5 },
  error: { fontSize: 13 },
  select: { minHeight: 46, paddingHorizontal: spacing.md, borderWidth: 1, borderRadius: radius.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  menu: { marginTop: spacing.xs, borderWidth: 1, borderRadius: radius.md, overflow: "hidden" },
  option: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, minHeight: 42, justifyContent: "center" },
  button: { minHeight: 46, paddingHorizontal: spacing.lg, borderRadius: radius.md, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  secondary: { backgroundColor: "transparent" },
  hovered: { opacity: 0.78 },
  buttonText: { fontSize: 16, fontWeight: "700" }
});
export {
  Footer,
  Header,
  List,
  SelectField,
  SubmitButton,
  TextField,
  colors,
  radius,
  resolveColorStyle,
  spacing
};
//# sourceMappingURL=index.js.map