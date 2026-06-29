import type { Meta } from '@storybook/react';
import { NavTabs } from './NavTabs';

const Story: Meta<typeof NavTabs> = {
  component: NavTabs,
  title: 'NavTabs',
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: 'The list of tabs to display.',
      control: 'array',
      table: {
        type: {
          summary: 'Array',
        },
      },
    },
    textStyles: {
      description: 'Text styles for the tabs.',
    },
    textActive: {
      description: 'Text styles for the active tab.',
    },
    divStyles: {
      description: 'Styles for the tabs container.',
    },
    tabStyles: {
      description: 'Styles for individual tabs.',
    },
    pathIncludes: {
      description:
        'Indicates whether the link should match the current location.',
    },
  },
};

export default Story;

export const Primary = (args) => (
  <NavTabs
    tabs={args.tabs}
    textStyles={args.textStyles}
    textActive={args.textActive}
    divStyles={args.divStyles}
    tabStyles={args.tabStyles}
    pathIncludes={args.pathIncludes}
  />
);

Primary.args = {
  tabs: [
    {
      title: 'Home',
      href: '#',
      onClick: (tab) => tab.onClick,
      isActive: true,
      image: '/'
    },
    {
      title: 'Sales',
      href: '#',
      onClick: (tab) => tab.onClick,
      isActive: false,
    },
  ],
  textStyles:
    'lg:text-base text-xs text-center text-title-light hover:text-buydepa-blue hover:font-bold lg:mx-10 mx-2',
  textActive:
    'text-buydepa-blue font-bold lg:shadow-[0_40px_0_0_#3A5AFF] shadow-[0_34px_0_0_#3A5AFF] w-100 h-[2px] rounded-[5px] px-0 lg:px-5',
  divStyles:
    'bg-background-secondary justify-center rounded-[10px] shadow-[0_2px_4px_rgba(42,49,104,0.25)] h-[55px] w-full mb-5',
  tabStyles: 'flex justify-center',
  pathIncludes: false,
};
