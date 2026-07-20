import type { StoryObj } from "@storybook/react";
import { NavTabs } from "./NavTabs";

type Story = StoryObj<typeof NavTabs>;

export const Primary: Story = {
  args: {
    tabs: [
      {
        title: "Home",
        href: "#",
        isActive: true,
        image: "/",
      },
      {
        title: "Sales",
        href: "#",
        isActive: false,
      },
    ],
    textStyles:
      "lg:text-base text-xs text-center text-title-light hover:text-buydepa-blue hover:font-bold lg:mx-10 mx-2",
    textActive:
      "text-buydepa-blue font-bold lg:shadow-[0_40px_0_0_#3A5AFF] shadow-[0_34px_0_0_#3A5AFF] w-100 h-[2px] rounded-[5px] px-0 lg:px-5",
    divStyles:
      "bg-background-secondary justify-center rounded-[10px] shadow-[0_2px_4px_rgba(42,49,104,0.25)] h-[55px] w-full mb-5",
    tabStyles: "flex justify-center",
    pathIncludes: false,
  },
};
