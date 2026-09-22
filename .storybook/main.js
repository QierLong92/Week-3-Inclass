import { mergeConfig } from 'vite';
import process from 'node:process';

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ['../docs/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { autodocs: true },
  async viteFinal(currentConfig) {
    return mergeConfig(currentConfig, {
      base: process.env.STORYBOOK_BASE_PATH || '/',
      define: { global: 'globalThis' },
      resolve: { alias: [{ find: /^react-native$/, replacement: 'react-native-web' }] },
    });
  },
};

export default config;
