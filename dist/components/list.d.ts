/**
 * Displays ordered, bulleted, checklist, or reorderable content.
 *
 * In `draggable` mode, drag the grip beside an item to reorder it. The parent
 * owns the list state and receives `onMoveItem(item, fromIndex, toIndex)` when
 * the grip is released. Up/down buttons provide the same action for keyboard
 * and screen-reader users.
 */
export function List({ items, variant, checkedIds, onToggleItem, onMoveItem, theme, colorStyle, style }: {
    items?: never[] | undefined;
    variant?: string | undefined;
    checkedIds?: never[] | undefined;
    onToggleItem: any;
    onMoveItem: any;
    theme?: string | undefined;
    colorStyle: any;
    style: any;
}): import("react").JSX.Element;
