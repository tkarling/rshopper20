import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import Header, { HeaderProps } from "./Header";

export default {
  title: "RS/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const ShoppingList = Template.bind({});
ShoppingList.args = {};

export const Recipies = Template.bind({});
Recipies.args = { page: "Recipies" };

export const Rosolli = Template.bind({});
Rosolli.args = { page: "Recipe", shownRecipe: "Rosolli" };
