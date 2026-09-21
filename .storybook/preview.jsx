import { View } from 'react-native';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import { colors, spacing } from '../src/tokens.js';

const preview = {
  decorators: [(Story) => <View style={{ alignItems: 'stretch', minWidth: 280, padding: spacing.xl }}><Story /></View>],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    backgrounds: {
      options: {
        canvas: { name: 'Canvas', value: colors.light.background },
        night: { name: 'Night', value: colors.dark.background },
      },
    },
    controls: { expanded: true, matchers: { color: /(background|color)$/i, date: /Date$/i } },
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        compactPhone: { name: 'Compact phone', styles: { width: '360px', height: '740px' }, type: 'mobile' },
      },
    },
  },
};

export default preview;
