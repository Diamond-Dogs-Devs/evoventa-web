import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin) => plugin?.constructor.name !== 'ProgressPlugin'
      );
    }
    return config;
  },
};

export default config;
