import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
type IconLinkProps = {
    /** Screen-reader label and optional visible caption. */
    label: string;
    /** Any React node: a text glyph, image, or icon-library component. */
    icon: ReactNode;
    onPress: () => void;
    /** Provides a semantic default appearance for common icon-link uses. */
    kind?: 'social' | 'navigation' | 'action';
    showLabel?: boolean;
    disabled?: boolean;
    theme?: 'light' | 'dark';
    colorStyle?: Record<string, string>;
    style?: StyleProp<ViewStyle>;
};
type IconLinkGroupProps = {
    children: ReactNode;
    direction?: 'row' | 'column';
    style?: StyleProp<ViewStyle>;
};
/** An accessible social, navigation, or action icon link with a custom icon slot. */
export declare function IconLink({ label, icon, onPress, kind, showLabel, disabled, theme, colorStyle, style, }: IconLinkProps): import("react").JSX.Element;
/** Align multiple IconLink elements as a social or action cluster. */
export declare function IconLinkGroup({ children, direction, style }: IconLinkGroupProps): import("react").JSX.Element;
export type { IconLinkGroupProps, IconLinkProps };
