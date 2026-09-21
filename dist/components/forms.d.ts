export function TextField({ label, value, onChangeText, placeholder, disabled, error, theme, colorStyle, style, ...inputProps }: {
    [x: string]: any;
    label: any;
    value: any;
    onChangeText: any;
    placeholder: any;
    disabled?: boolean | undefined;
    error: any;
    theme?: string | undefined;
    colorStyle: any;
    style: any;
}): import("react").JSX.Element;
/** A small dependency-free select menu for React Native and react-native-web. */
export function SelectField({ label, value, options, onChange, placeholder, disabled, theme, colorStyle, style }: {
    label: any;
    value: any;
    options?: never[] | undefined;
    onChange: any;
    placeholder?: string | undefined;
    disabled?: boolean | undefined;
    theme?: string | undefined;
    colorStyle: any;
    style: any;
}): import("react").JSX.Element;
export function SubmitButton({ label, onPress, disabled, variant, theme, colorStyle, style }: {
    label?: string | undefined;
    onPress: any;
    disabled?: boolean | undefined;
    variant?: string | undefined;
    theme?: string | undefined;
    colorStyle: any;
    style: any;
}): import("react").JSX.Element;
