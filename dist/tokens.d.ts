/**
 * Creates a component palette from a built-in theme and optional per-instance
 * overrides. Every public component accepts this object as `colorStyle`.
 */
export function resolveColorStyle(theme?: string, colorStyle?: {}): any;
export namespace colors {
    namespace light {
        let background: string;
        let surface: string;
        let text: string;
        let mutedText: string;
        let border: string;
        let primary: string;
        let primaryText: string;
    }
    namespace dark {
        let background_1: string;
        export { background_1 as background };
        let surface_1: string;
        export { surface_1 as surface };
        let text_1: string;
        export { text_1 as text };
        let mutedText_1: string;
        export { mutedText_1 as mutedText };
        let border_1: string;
        export { border_1 as border };
        let primary_1: string;
        export { primary_1 as primary };
        let primaryText_1: string;
        export { primaryText_1 as primaryText };
    }
    let danger: string;
    let disabled: string;
    let checked: string;
}
export namespace spacing {
    let xs: number;
    let sm: number;
    let md: number;
    let lg: number;
    let xl: number;
}
export namespace radius {
    let sm_1: number;
    export { sm_1 as sm };
    let md_1: number;
    export { md_1 as md };
    export let pill: number;
}
