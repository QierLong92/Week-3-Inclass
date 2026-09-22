import { Menu } from './menus';

const items = [
  { id: 'home', label: 'Home', onPress: () => {} },
  { id: 'library', label: 'Library', onPress: () => {} },
  { id: 'settings', label: 'Settings', onPress: () => {} },
];

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  args: { items },
  argTypes: {
    variant: { control: 'radio', options: ['horizontal', 'vertical', 'hamburger'] },
    theme: { control: 'radio', options: ['light', 'dark'] },
    colorStyle: { control: 'object' },
  },
};

export default meta;

export const Horizontal = { args: { variant: 'horizontal' } };
export const Vertical = { args: { variant: 'vertical' } };
export const Hamburger = { args: { variant: 'hamburger' } };
export const HoverOpen = {
  args: { variant: 'hamburger', openOnHover: true },
  parameters: { docs: { description: { story: 'On the web, move the pointer over this hamburger menu to open it.' } } },
};
export const CustomPalette = {
  args: { variant: 'horizontal', colorStyle: { background: '#FFF4E8', surface: '#FFE3C3', text: '#4A2100', border: '#E6A96A', primary: '#A34B00' } },
};
