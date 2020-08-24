import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ItemList, { ItemListProps } from "./ItemList";
import { Ingredient } from "../hooks/useIngredients";

const ITEM_LIST: Ingredient[] = [
  { id: "1", count: 2, name: "carrots", aisle: "Produce", recipe: "Rosolli" },
  {
    id: "2",
    count: 1,
    name: "cinnamon roll",
    aisle: "Bakery",
    recipe: "Base List",
  },
];

export default {
  title: "RS/Item List",
  component: ItemList,
} as Meta;

const Template: Story<ItemListProps> = (args) => <ItemList {...args} />;

export const EmptyShoppingList = Template.bind({});
EmptyShoppingList.args = {};

export const ShoppingList = Template.bind({});
ShoppingList.args = { items: ITEM_LIST };

export const Recipies = Template.bind({});
Recipies.args = { page: "Recipies" };

export const Rosolli = Template.bind({});
Rosolli.args = { page: "Recipe", shownRecipe: "Rosolli", items: ITEM_LIST };
