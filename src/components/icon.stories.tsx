import { IconLink, IconLinkGroup } from './icon';

const meta = {
  title: 'Navigation/Icon Link',
  component: IconLink,
  tags: ['autodocs'],
  args: { label: 'Open library', icon: '⌂', onPress: () => {}, kind: 'navigation' },
  argTypes: {
    kind: { control: 'radio', options: ['social', 'navigation', 'action'] },
    theme: { control: 'radio', options: ['light', 'dark'] },
    colorStyle: { control: 'object' },
  },
};

export default meta;

export const Navigation = {};
export const ActionWithLabel = { args: { label: 'Share', icon: '↗', kind: 'action', showLabel: true } };
export const Social = { args: { label: 'Follow on social media', icon: '◎', kind: 'social' } };
export const CustomIcon = { args: { label: 'Favorite', icon: '♥', showLabel: true, colorStyle: { primary: '#C62968', text: '#5A1232', background: '#FFF0F6', border: '#F2A4C6' } } };
export const IconGroup = {
  render: () => <IconLinkGroup><IconLink label="Home" icon="⌂" kind="navigation" onPress={() => {}} /><IconLink label="Share" icon="↗" kind="action" onPress={() => {}} /><IconLink label="Follow" icon="◎" kind="social" onPress={() => {}} /></IconLinkGroup>,
};
