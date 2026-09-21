import { createElement, useCallback, useMemo, useRef, useState } from 'react';
import { PanResponder, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, resolveColorStyle, spacing } from '../tokens';

/**
 * Displays ordered, bulleted, checklist, or reorderable content.
 *
 * In `draggable` mode, drag the grip beside an item to reorder it. The parent
 * owns the list state and receives `onMoveItem(item, fromIndex, toIndex)` when
 * the grip is released. Up/down buttons provide the same action for keyboard
 * and screen-reader users.
 */
export function List({ items = [], variant = 'bulleted', checkedIds = [], onToggleItem, onMoveItem, theme = 'light', colorStyle, style }) {
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
      if (target !== current.index) onMoveItem?.(items[current.index], current.index, target);
      return null;
    });
  }, [items, onMoveItem]);

  return (
    <View style={[styles.list, style]}>
      {items.map((item, index) => {
        const checked = isChecked(item);
        const dragging = drag?.index === index;
        const target = drag?.target === index && !dragging;
        const marker = variant === 'numbered' ? `${index + 1}.` : variant === 'checklist' ? (checked ? '✓' : '○') : variant === 'bulleted' ? '•' : null;
        const row = (
          <View
            onLayout={({ nativeEvent }) => { itemLayouts.current[index] = nativeEvent.layout; }}
            style={[styles.row, { borderColor: palette.border }, dragging && [styles.draggingRow, { backgroundColor: palette.background, transform: [{ translateY: drag.offset }] }], target && [styles.dropTarget, { borderColor: palette.primary }]]}
          >
            {variant === 'draggable' ? <DragHandle item={item} index={index} onBegin={beginDrag} onMove={updateDrag} onFinish={finishDrag} color={palette.primary} /> : <Text style={[styles.marker, { color: checked ? palette.checked : palette.primary }]}>{marker}</Text>}
            <Text style={[styles.itemText, checked && styles.checked, { color: palette.text }]}>{item.label}</Text>
            {variant === 'draggable' ? <ReorderButtons item={item} index={index} count={items.length} onMoveItem={onMoveItem} color={palette.primary} /> : null}
          </View>
        );
        if (variant === 'draggable' && Platform.OS === 'web') {
          return <WebDropZone key={item.id ?? item.label} index={index} onDragOver={setDropTarget} onDrop={finishDrag}>{row}</WebDropZone>;
        }
        return variant === 'checklist' ? (
          <Pressable key={item.id ?? item.label} accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={() => onToggleItem?.(item)} style={({ pressed, hovered }) => [(pressed || hovered) && styles.active]}>{row}</Pressable>
        ) : <View key={item.id ?? item.label}>{row}</View>;
      })}
    </View>
  );
}

function DragHandle({ item, index, onBegin, onMove, onFinish, color }) {
  if (Platform.OS === 'web') {
    return createElement('div', {
      'aria-label': `Drag ${item.label}`,
      draggable: true,
      onDragEnd: onFinish,
      onDragStart: (event) => {
        event.dataTransfer.effectAllowed = 'move';
        onBegin(index);
      },
      role: 'button',
      style: { alignItems: 'center', cursor: 'grab', display: 'flex', justifyContent: 'center', minHeight: 44, minWidth: 36 },
    }, createElement('span', { style: { color, fontSize: 20, fontWeight: 700 } }, '⠿'));
  }

  return <NativeDragHandle item={item} index={index} onBegin={onBegin} onMove={onMove} onFinish={onFinish} color={color} />;
}

function NativeDragHandle({ item, index, onBegin, onMove, onFinish, color }) {
  const responder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => onBegin(index),
    onPanResponderMove: (_, gesture) => onMove(gesture.dy),
    onPanResponderRelease: onFinish,
    onPanResponderTerminate: onFinish,
  }), [index, onBegin, onFinish, onMove]);

  return <View {...responder.panHandlers} accessibilityLabel={`Drag ${item.label}`} accessibilityRole="adjustable" style={styles.dragHandle}><Text style={[styles.grip, { color }]}>⠿</Text></View>;
}

function WebDropZone({ children, index, onDragOver, onDrop }) {
  return createElement('div', {
    onDragOver: (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      onDragOver(index);
    },
    onDrop: (event) => {
      event.preventDefault();
      onDrop(index);
    },
    style: { position: 'relative' },
  }, children);
}

function ReorderButtons({ item, index, count, onMoveItem, color }) {
  return <View style={styles.reorderControls}>
    <Pressable disabled={index === 0} accessibilityRole="button" accessibilityLabel={`Move ${item.label} up`} onPress={() => onMoveItem?.(item, index, index - 1)}><Text style={[styles.move, { color }, index === 0 && styles.disabled]}>↑</Text></Pressable>
    <Pressable disabled={index === count - 1} accessibilityRole="button" accessibilityLabel={`Move ${item.label} down`} onPress={() => onMoveItem?.(item, index, index + 1)}><Text style={[styles.move, { color }, index === count - 1 && styles.disabled]}>↓</Text></Pressable>
  </View>;
}

const styles = StyleSheet.create({
  list: { gap: spacing.xs },
  row: { minHeight: 48, paddingHorizontal: spacing.sm, flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth },
  marker: { width: 28, fontWeight: '700', textAlign: 'center' },
  itemText: { flex: 1, fontSize: 16 },
  checked: { textDecorationLine: 'line-through', opacity: 0.7 },
  active: { opacity: 0.65 },
  draggingRow: { borderRadius: radius.sm, elevation: 3, opacity: 0.94, zIndex: 2 },
  dropTarget: { borderTopWidth: 2 },
  dragHandle: { alignItems: 'center', justifyContent: 'center', minHeight: 44, minWidth: 36, cursor: 'grab' },
  grip: { fontSize: 20, fontWeight: '700' },
  reorderControls: { flexDirection: 'row', gap: spacing.sm },
  move: { padding: spacing.sm, fontSize: 19, fontWeight: '700', borderRadius: radius.sm },
  disabled: { opacity: 0.3 },
});
