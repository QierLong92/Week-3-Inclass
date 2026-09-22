"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  Footer: () => Footer,
  Header: () => Header,
  IconLink: () => IconLink,
  IconLinkGroup: () => IconLinkGroup,
  List: () => List,
  Menu: () => Menu,
  SelectField: () => SelectField,
  SubmitButton: () => SubmitButton,
  TextField: () => TextField,
  colors: () => colors,
  radius: () => radius,
  resolveColorStyle: () => resolveColorStyle,
  spacing: () => spacing
});
module.exports = __toCommonJS(index_exports);

// src/components/header.jsx
var import_react_native = require("react-native");

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
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_native.View,
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderAction, { action: leftAction, color: palette.text }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: styles.titleBlock, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { numberOfLines: 1, style: [styles.title, { color: palette.text }], children: title }),
          !compact && subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: [styles.subtitle, { color: palette.mutedText }], children: subtitle }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderAction, { action: rightAction, color: palette.text, align: "right" })
      ]
    }
  );
}
function HeaderAction({ action, color, align }) {
  if (!action) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.View, { style: styles.actionSlot });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_native.Pressable,
    {
      accessibilityRole: "button",
      accessibilityLabel: action.label,
      onPress: action.onPress,
      style: ({ pressed, hovered }) => [styles.action, align === "right" && styles.actionRight, (pressed || hovered) && styles.actionActive],
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: [styles.actionText, { color }], children: action.label })
    }
  );
}
var styles = import_react_native.StyleSheet.create({
  header: { minHeight: 72, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, flexDirection: "row", alignItems: "center", borderBottomWidth: import_react_native.StyleSheet.hairlineWidth },
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
var import_react_native2 = require("react-native");
var import_jsx_runtime2 = require("react/jsx-runtime");
function Footer({ brand = "Your brand", links = [], theme = "light", colorStyle, compact = false, style }) {
  const palette = resolveColorStyle(theme, colorStyle);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native2.View, { style: [styles2.footer, compact && styles2.compact, { backgroundColor: palette.surface, borderTopColor: palette.border }, style], children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: [styles2.brand, { color: palette.text }], children: brand }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.View, { style: [styles2.links, compact && styles2.compactLinks], children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Pressable, { accessibilityRole: "link", onPress: link.onPress, style: ({ pressed, hovered }) => [styles2.link, (pressed || hovered) && styles2.linkActive], children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: [styles2.linkText, { color: palette.mutedText }], children: link.label }) }, link.label)) })
  ] });
}
var styles2 = import_react_native2.StyleSheet.create({
  footer: { padding: spacing.lg, borderTopWidth: import_react_native2.StyleSheet.hairlineWidth, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md },
  compact: { flexDirection: "column", alignItems: "flex-start" },
  brand: { fontSize: 14, fontWeight: "700" },
  links: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  compactLinks: { gap: spacing.sm },
  link: { paddingVertical: spacing.xs },
  linkActive: { opacity: 0.6 },
  linkText: { fontSize: 14 }
});

// src/components/list.jsx
var import_react = require("react");
var import_react_native3 = require("react-native");
var import_jsx_runtime3 = require("react/jsx-runtime");
function List({ items = [], variant = "bulleted", checkedIds = [], onToggleItem, onMoveItem, theme = "light", colorStyle, style }) {
  const [drag, setDrag] = (0, import_react.useState)(null);
  const itemLayouts = (0, import_react.useRef)([]);
  const palette = resolveColorStyle(theme, colorStyle);
  const isChecked = (item) => checkedIds.includes(item.id);
  const beginDrag = (0, import_react.useCallback)((index) => setDrag({ index, offset: 0, target: index }), []);
  const updateDrag = (0, import_react.useCallback)((offset) => {
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
  const setDropTarget = (0, import_react.useCallback)((target) => {
    setDrag((current) => current ? { ...current, target } : current);
  }, []);
  const finishDrag = (0, import_react.useCallback)((dropTarget) => {
    setDrag((current) => {
      if (!current) return null;
      const target = Number.isInteger(dropTarget) ? dropTarget : current.target;
      if (target !== current.index) onMoveItem == null ? void 0 : onMoveItem(items[current.index], current.index, target);
      return null;
    });
  }, [items, onMoveItem]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.View, { style: [styles3.list, style], children: items.map((item, index) => {
    const checked = isChecked(item);
    const dragging = (drag == null ? void 0 : drag.index) === index;
    const target = (drag == null ? void 0 : drag.target) === index && !dragging;
    const marker = variant === "numbered" ? `${index + 1}.` : variant === "checklist" ? checked ? "\u2713" : "\u25CB" : variant === "bulleted" ? "\u2022" : null;
    const row = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      import_react_native3.View,
      {
        onLayout: ({ nativeEvent }) => {
          itemLayouts.current[index] = nativeEvent.layout;
        },
        style: [styles3.row, { borderColor: palette.border }, dragging && [styles3.draggingRow, { backgroundColor: palette.background, transform: [{ translateY: drag.offset }] }], target && [styles3.dropTarget, { borderColor: palette.primary }]],
        children: [
          variant === "draggable" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DragHandle, { item, index, onBegin: beginDrag, onMove: updateDrag, onFinish: finishDrag, color: palette.primary }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.Text, { style: [styles3.marker, { color: checked ? palette.checked : palette.primary }], children: marker }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.Text, { style: [styles3.itemText, checked && styles3.checked, { color: palette.text }], children: item.label }),
          variant === "draggable" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ReorderButtons, { item, index, count: items.length, onMoveItem, color: palette.primary }) : null
        ]
      }
    );
    if (variant === "draggable" && import_react_native3.Platform.OS === "web") {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(WebDropZone, { index, onDragOver: setDropTarget, onDrop: finishDrag, children: row }, item.id ?? item.label);
    }
    return variant === "checklist" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked }, onPress: () => onToggleItem == null ? void 0 : onToggleItem(item), style: ({ pressed, hovered }) => [(pressed || hovered) && styles3.active], children: row }, item.id ?? item.label) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.View, { children: row }, item.id ?? item.label);
  }) });
}
function DragHandle({ item, index, onBegin, onMove, onFinish, color }) {
  if (import_react_native3.Platform.OS === "web") {
    return (0, import_react.createElement)("div", {
      "aria-label": `Drag ${item.label}`,
      draggable: true,
      onDragEnd: onFinish,
      onDragStart: (event) => {
        event.dataTransfer.effectAllowed = "move";
        onBegin(index);
      },
      role: "button",
      style: { alignItems: "center", cursor: "grab", display: "flex", justifyContent: "center", minHeight: 44, minWidth: 36 }
    }, (0, import_react.createElement)("span", { style: { color, fontSize: 20, fontWeight: 700 } }, "\u283F"));
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(NativeDragHandle, { item, index, onBegin, onMove, onFinish, color });
}
function NativeDragHandle({ item, index, onBegin, onMove, onFinish, color }) {
  const responder = (0, import_react.useMemo)(() => import_react_native3.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => onBegin(index),
    onPanResponderMove: (_, gesture) => onMove(gesture.dy),
    onPanResponderRelease: onFinish,
    onPanResponderTerminate: onFinish
  }), [index, onBegin, onFinish, onMove]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.View, { ...responder.panHandlers, accessibilityLabel: `Drag ${item.label}`, accessibilityRole: "adjustable", style: styles3.dragHandle, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.Text, { style: [styles3.grip, { color }], children: "\u283F" }) });
}
function WebDropZone({ children, index, onDragOver, onDrop }) {
  return (0, import_react.createElement)("div", {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_native3.View, { style: styles3.reorderControls, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.Pressable, { disabled: index === 0, accessibilityRole: "button", accessibilityLabel: `Move ${item.label} up`, onPress: () => onMoveItem == null ? void 0 : onMoveItem(item, index, index - 1), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.Text, { style: [styles3.move, { color }, index === 0 && styles3.disabled], children: "\u2191" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.Pressable, { disabled: index === count - 1, accessibilityRole: "button", accessibilityLabel: `Move ${item.label} down`, onPress: () => onMoveItem == null ? void 0 : onMoveItem(item, index, index + 1), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native3.Text, { style: [styles3.move, { color }, index === count - 1 && styles3.disabled], children: "\u2193" }) })
  ] });
}
var styles3 = import_react_native3.StyleSheet.create({
  list: { gap: spacing.xs },
  row: { minHeight: 48, paddingHorizontal: spacing.sm, flexDirection: "row", alignItems: "center", borderBottomWidth: import_react_native3.StyleSheet.hairlineWidth },
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
var import_react2 = require("react");
var import_react_native4 = require("react-native");
var import_jsx_runtime4 = require("react/jsx-runtime");
function TextField({ label, value, onChangeText, placeholder, disabled = false, error, theme = "light", colorStyle, style, ...inputProps }) {
  const palette = resolveColorStyle(theme, colorStyle);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react_native4.View, { style: [styles4.field, style], children: [
    label ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Text, { style: [styles4.label, { color: palette.text }], children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.TextInput, { value, onChangeText, placeholder, placeholderTextColor: palette.mutedText, editable: !disabled, style: [styles4.input, { color: palette.text, backgroundColor: palette.background, borderColor: error ? palette.danger : palette.border }, disabled && styles4.inputDisabled], ...inputProps }),
    error ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Text, { accessibilityRole: "alert", style: [styles4.error, { color: palette.danger }], children: error }) : null
  ] });
}
function SelectField({ label, value, options = [], onChange, placeholder = "Select an option", disabled = false, theme = "light", colorStyle, style }) {
  const [open, setOpen] = (0, import_react2.useState)(false);
  const palette = resolveColorStyle(theme, colorStyle);
  const selected = options.find((option) => option.value === value);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react_native4.View, { style: [styles4.field, style], children: [
    label ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Text, { style: [styles4.label, { color: palette.text }], children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react_native4.Pressable, { disabled, accessibilityRole: "button", accessibilityLabel: (selected == null ? void 0 : selected.label) ?? placeholder, accessibilityState: { expanded: open, disabled }, onPress: () => setOpen((current) => !current), style: ({ pressed, hovered }) => [styles4.select, { backgroundColor: palette.background, borderColor: palette.border }, disabled && styles4.inputDisabled, (pressed || hovered) && styles4.hovered], children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Text, { style: { color: selected ? palette.text : palette.mutedText }, children: (selected == null ? void 0 : selected.label) ?? placeholder }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Text, { style: { color: palette.mutedText }, children: "\u2304" })
    ] }),
    open ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.View, { style: [styles4.menu, { backgroundColor: palette.background, borderColor: palette.border }], children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Pressable, { accessibilityRole: "menuitem", onPress: () => {
      onChange == null ? void 0 : onChange(option.value);
      setOpen(false);
    }, style: ({ pressed, hovered }) => [styles4.option, (pressed || hovered) && { backgroundColor: palette.surface }], children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Text, { style: { color: palette.text }, children: option.label }) }, option.value)) }) : null
  ] });
}
function SubmitButton({ label = "Submit", onPress, disabled = false, variant = "primary", theme = "light", colorStyle, style }) {
  const palette = resolveColorStyle(theme, colorStyle);
  const secondary = variant === "secondary";
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Pressable, { disabled, accessibilityRole: "button", accessibilityState: { disabled }, onPress, style: ({ pressed, hovered }) => [styles4.button, { backgroundColor: secondary ? palette.background : palette.primary, borderColor: palette.primary }, secondary && styles4.secondary, disabled && { backgroundColor: palette.disabled, borderColor: palette.disabled }, (pressed || hovered) && !disabled && styles4.hovered, style], children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native4.Text, { style: [styles4.buttonText, { color: secondary ? palette.primary : palette.primaryText }], children: label }) });
}
var styles4 = import_react_native4.StyleSheet.create({
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

// src/components/menus.tsx
var import_react3 = require("react");
var import_react_native5 = require("react-native");
var import_jsx_runtime5 = require("react/jsx-runtime");
function Menu({
  items,
  variant = "horizontal",
  openOnHover = false,
  label = "Open navigation menu",
  theme = "light",
  colorStyle,
  style
}) {
  const [open, setOpen] = (0, import_react3.useState)(false);
  const palette = resolveColorStyle(theme, colorStyle);
  const hamburger = variant === "hamburger";
  const visible = !hamburger || open;
  const content = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    hamburger ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      import_react_native5.Pressable,
      {
        accessibilityLabel: label,
        accessibilityRole: "button",
        accessibilityState: { expanded: open },
        onPress: () => setOpen((current) => !current),
        style: (state) => [styles5.trigger, { backgroundColor: palette.background, borderColor: palette.border }, (state.pressed || isHovered(state)) && styles5.active],
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native5.Text, { style: [styles5.triggerIcon, { color: palette.primary }], children: "\u2630" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native5.Text, { style: [styles5.triggerLabel, { color: palette.text }], children: "Menu" })
        ]
      }
    ) : null,
    visible ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native5.View, { style: [styles5.menu, variant === "horizontal" ? styles5.horizontal : styles5.vertical, hamburger && [styles5.dropdown, { backgroundColor: palette.background, borderColor: palette.border }]], children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_react_native5.Pressable,
      {
        disabled: item.disabled,
        accessibilityRole: "link",
        accessibilityState: { disabled: item.disabled },
        onPress: () => {
          item.onPress();
          if (hamburger) setOpen(false);
        },
        style: (state) => [styles5.item, (state.pressed || isHovered(state)) && { backgroundColor: palette.surface }, item.disabled && styles5.disabled],
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native5.Text, { style: [styles5.itemLabel, { color: palette.text }], children: item.label })
      },
      item.id
    )) }) : null
  ] });
  if (openOnHover && hamburger && import_react_native5.Platform.OS === "web") {
    return (0, import_react3.createElement)("div", { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), style: { alignSelf: "flex-start", position: "relative" } }, content);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native5.View, { style: [styles5.container, style], children: content });
}
function isHovered(state) {
  return state.hovered === true;
}
var styles5 = import_react_native5.StyleSheet.create({
  container: { alignSelf: "flex-start", position: "relative" },
  menu: { gap: spacing.xs },
  horizontal: { flexDirection: "row", flexWrap: "wrap" },
  vertical: { alignItems: "stretch" },
  dropdown: { borderWidth: 1, borderRadius: radius.md, marginTop: spacing.xs, minWidth: 176, padding: spacing.xs, position: "absolute", right: 0, top: 44, zIndex: 3 },
  trigger: { alignItems: "center", borderRadius: radius.md, borderWidth: 1, flexDirection: "row", gap: spacing.sm, minHeight: 44, paddingHorizontal: spacing.md },
  triggerIcon: { fontSize: 20, fontWeight: "700" },
  triggerLabel: { fontSize: 15, fontWeight: "700" },
  item: { borderRadius: radius.sm, minHeight: 40, justifyContent: "center", paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  itemLabel: { fontSize: 15, fontWeight: "600" },
  active: { opacity: 0.72 },
  disabled: { opacity: 0.42 }
});

// src/components/icon.tsx
var import_react_native6 = require("react-native");
var import_jsx_runtime6 = require("react/jsx-runtime");
function IconLink({
  label,
  icon,
  onPress,
  kind = "action",
  showLabel = false,
  disabled = false,
  theme = "light",
  colorStyle,
  style
}) {
  const palette = resolveColorStyle(theme, colorStyle);
  const kindStyle = kind === "social" ? styles6.social : kind === "navigation" ? styles6.navigation : styles6.action;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    import_react_native6.Pressable,
    {
      disabled,
      accessibilityLabel: label,
      accessibilityRole: "link",
      accessibilityState: { disabled },
      onPress,
      style: (state) => [styles6.link, kindStyle, { backgroundColor: palette.background, borderColor: palette.border }, (state.pressed || isHovered2(state)) && { backgroundColor: palette.surface, borderColor: palette.primary }, disabled && styles6.disabled, style],
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_native6.View, { pointerEvents: "none", style: styles6.icon, children: typeof icon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_native6.Text, { style: [styles6.glyph, { color: palette.primary }], children: icon }) : icon }),
        showLabel ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_native6.Text, { style: [styles6.label, { color: palette.text }], children: label }) : null
      ]
    }
  );
}
function IconLinkGroup({ children, direction = "row", style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_native6.View, { style: [styles6.group, direction === "column" && styles6.column, style], children });
}
function isHovered2(state) {
  return state.hovered === true;
}
var styles6 = import_react_native6.StyleSheet.create({
  link: { alignItems: "center", borderRadius: radius.md, borderWidth: 1, flexDirection: "row", gap: spacing.xs, justifyContent: "center", minHeight: 44, minWidth: 44, paddingHorizontal: spacing.sm },
  social: { borderRadius: radius.pill },
  navigation: { borderRadius: radius.sm },
  action: {},
  icon: { alignItems: "center", justifyContent: "center" },
  glyph: { fontSize: 20, fontWeight: "700" },
  label: { fontSize: 14, fontWeight: "600" },
  disabled: { opacity: 0.42 },
  group: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  column: { alignItems: "flex-start", flexDirection: "column" }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Footer,
  Header,
  IconLink,
  IconLinkGroup,
  List,
  Menu,
  SelectField,
  SubmitButton,
  TextField,
  colors,
  radius,
  resolveColorStyle,
  spacing
});
//# sourceMappingURL=index.cjs.map