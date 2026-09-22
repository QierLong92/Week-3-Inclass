import { type StyleProp, type ViewStyle } from 'react-native';
type MenuItem = {
    id: string;
    label: string;
    onPress: () => void;
    disabled?: boolean;
};
type MenuProps = {
    /** Items shown in the menu. */
    items: MenuItem[];
    /** Horizontal and vertical menus are always visible; hamburger can collapse. */
    variant?: 'horizontal' | 'vertical' | 'hamburger';
    /** Lets a hamburger menu open when a pointer enters it on the web. */
    openOnHover?: boolean;
    /** Accessible label for the hamburger trigger. */
    label?: string;
    theme?: 'light' | 'dark';
    colorStyle?: Record<string, string>;
    style?: StyleProp<ViewStyle>;
};
/** Navigation menu with horizontal, vertical, hamburger, and hover-open modes. */
export declare function Menu({ items, variant, openOnHover, label, theme, colorStyle, style, }: MenuProps): import("react").JSX.Element;
export type { MenuItem, MenuProps };
