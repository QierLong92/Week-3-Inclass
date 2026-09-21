/**
 * A responsive navigation header. Set `surface="transparent"` while it sits
 * over hero content, then change it to `solid` after the page is scrolled.
 */
export function Header({ title, subtitle, theme, colorStyle, surface, compact, leftAction, rightAction, style, }: {
    title: any;
    subtitle: any;
    theme?: string | undefined;
    colorStyle: any;
    surface?: string | undefined;
    compact?: boolean | undefined;
    leftAction: any;
    rightAction: any;
    style: any;
}): import("react").JSX.Element;
