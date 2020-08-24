import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Ingredient, Recipe } from "../hooks/useIngredients";
import ShoppingItem from "./ShoppingItem";
import ReadOnlyItem from "./ReadOnlyItem";
import { Page } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 25,
  },
  title: {
    fontWeight: 600,
    padding: "10px 16px",
    flex: 1,
  },
  noItems: {
    padding: 12,
  },
}));

const Buttons = ({
  page,
  showChecked,
  actions,
  shownRecipe,
}: {
  page: Page;
  showChecked: boolean;
  actions: any;
  shownRecipe?: string;
}) => {
  const classes = useStyles();
  const { setEditedItem, setShowChecked } = actions;
  const label = page === "Shopping List" ? "Show Bought" : "Show On List";
  const matches = useMediaQuery("(min-width:600px)");
  const mainPage = page === "Shopping List" || page === "Shopping History";

  return (
    <div className={classes.buttonContainer}>
      <IconButton
        aria-label="submit"
        color="primary"
        onClick={() => setEditedItem({ id: "add" } as any)}
      >
        <AddIcon />
      </IconButton>
      {!matches && <div className={classes.title}>{shownRecipe || page}</div>}
      {mainPage && (
        <FormControlLabel
          value="start"
          control={
            <Checkbox
              checked={showChecked}
              onClick={() => {
                setShowChecked((value: boolean) => !value);
              }}
            />
          }
          label={label}
          labelPlacement="start"
        />
      )}
    </div>
  );
};

const getShownItems = ({
  items,
  page,
  searchString,
  showChecked,
  shownRecipe,
}: {
  items: Ingredient[] | Recipe[];
  page: Page;
  searchString: string;
  showChecked: boolean;
  shownRecipe: string;
}) => {
  const applicableItems = !shownRecipe
    ? items
    : (items as Ingredient[]).filter((item) => item.recipe === shownRecipe);
  return (showChecked
    ? applicableItems
    : (applicableItems as (
        | Ingredient
        | Recipe
      )[]).filter((item: Ingredient | Recipe) =>
        page === "Shopping List"
          ? !(item as Ingredient).isBought
          : !item.isOnList
      )
  ).filter(
    (item: Ingredient | Recipe) =>
      !searchString ||
      item.name?.includes(searchString) ||
      (item as Ingredient).aisle?.includes(searchString) ||
      (item as Recipe).tag?.includes(searchString)
  );
};

export interface ItemListProps {
  page: Page;
  shownRecipe: string;
  items?: Ingredient[];
  searchString: string;
  actions: {
    setRecipe: (recipe: string) => void;
    setEditedItem: (item: Ingredient) => void;
    toggleIsBought: (item: Ingredient) => Promise<void>;
    toggleIsOnList: (item: Ingredient) => Promise<void>;
    createNewShoppingItem: (item: Ingredient) => Promise<void>;
    updateShoppingItem: (item: Ingredient) => Promise<void>;
    deleteShoppingItem: (item: Ingredient) => Promise<void>;
  };
}
export default function ItemList({
  page,
  shownRecipe,
  items = [],
  searchString,
  actions = {
    setRecipe: (recipe: string) => console.log("called setRecipe", recipe),
    setEditedItem: (item: Ingredient) =>
      console.log("called setEditedItem", item),
    toggleIsBought: (item: Ingredient) => {
      return Promise.resolve(console.log("called toggleIsBought", item));
    },
    toggleIsOnList: (item: Ingredient) =>
      Promise.resolve(console.log("called toggleIsOnList", item)),
    createNewShoppingItem: (item: Ingredient) => {
      return Promise.resolve(console.log("called createNewShoppingItem", item));
    },
    updateShoppingItem: (item: Ingredient) => {
      return Promise.resolve(console.log("called updateShoppingItem", item));
    },
    deleteShoppingItem: (item: Ingredient) => {
      return Promise.resolve(console.log("called deleteShoppingItem", item));
    },
  },
}: ItemListProps) {
  const classes = useStyles();

  const [editedItem, setEditedItem] = useState({} as Ingredient | Recipe);
  const [showChecked, setShowChecked] = useState(true);
  const shownItems = items
    ? getShownItems({ items, page, searchString, showChecked, shownRecipe })
    : [];
  const isEditing = !!editedItem.id;
  return (
    <div>
      {!isEditing && (
        <Buttons
          page={page}
          showChecked={showChecked}
          actions={{ setEditedItem, setShowChecked }}
          shownRecipe={shownRecipe}
        />
      )}
      {editedItem.id === "add" && (
        <ShoppingItem
          page={page}
          shownRecipe={shownRecipe}
          actions={{ ...actions, setEditedItem }}
        />
      )}
      {!shownItems.length && <div className={classes.noItems}>No Items</div>}
      {!!shownItems.length && (
        <List className={classes.root}>
          {shownItems.map((item) =>
            editedItem.id === item.id ? (
              <ShoppingItem
                key={item.id}
                page={page}
                shownRecipe={shownRecipe}
                item={item}
                actions={{ ...actions, setEditedItem }}
              />
            ) : (
              <ReadOnlyItem
                key={item.id}
                page={page}
                item={item}
                actions={{
                  ...actions,
                  onClick: isEditing
                    ? () => {}
                    : page === "Recipies"
                    ? actions.setRecipe
                    : setEditedItem,
                  toggleIsBought: isEditing ? () => {} : actions.toggleIsBought,
                  toggleIsOnList: isEditing ? () => {} : actions.toggleIsOnList,
                }}
              />
            )
          )}
        </List>
      )}
    </div>
  );
}
