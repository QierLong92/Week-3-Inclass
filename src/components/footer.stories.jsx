import { Footer } from './footer';

const links = [{ label: 'About', onPress: () => {} }, { label: 'Accessibility', onPress: () => {} }, { label: 'Contact', onPress: () => {} }];
const meta = { title: 'Navigation/Footer', component: Footer, tags: ['autodocs'], args: { brand: 'Field Notes', links, theme: 'light' }, argTypes: { theme: { control: 'radio', options: ['light', 'dark'] }, colorStyle: { control: 'object' } } };

export default meta;
export const Default = {};
export const Mobile = { args: { compact: true }, parameters: { viewport: { defaultViewport: 'compactPhone' } } };
export const Dark = { args: { theme: 'dark' }, parameters: { backgrounds: { default: 'night' } } };
export const CustomPalette = { args: { colorStyle: { surface: '#E7F7F1', text: '#073B2B', mutedText: '#16604A', border: '#8BD1B7' } } };
