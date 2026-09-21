import { Header } from './header';

const meta = {
  title: 'Navigation/Header', component: Header, tags: ['autodocs'],
  args: { title: 'Field Notes', subtitle: 'An intentional component library', theme: 'light', surface: 'solid' },
  argTypes: { theme: { control: 'radio', options: ['light', 'dark'] }, surface: { control: 'radio', options: ['solid', 'transparent'] }, compact: { control: 'boolean' }, colorStyle: { control: 'object' } },
};

export default meta;
export const Solid = {};
export const TransparentOverHero = { args: { surface: 'transparent', theme: 'dark', subtitle: 'Use this before content scrolls beneath the navigation.' }, parameters: { backgrounds: { default: 'night' } } };
export const Mobile = { args: { compact: true, leftAction: { label: 'Back', onPress: () => {} }, rightAction: { label: 'Save', onPress: () => {} } }, parameters: { viewport: { defaultViewport: 'compactPhone' } } };
export const CustomPalette = { args: { colorStyle: { background: '#FFF4E8', text: '#4A2100', mutedText: '#8B4B14', border: '#E6A96A' } } };
