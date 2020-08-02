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
}));

const Buttons = ({
  page,
  showChecked,
  actions,
  recipeName,
}: {
  page: Page;
  showChecked: boolean;
  actions: any;
  recipeName?: string;
}) => {
  const classes = useStyles();
  const { setEditedItem, setShowChecked } = actions;
  const label = page === "Shopping List" ? "Show Bought" : "Show On List";
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.buttonContainer}>
      <IconButton
        aria-label="submit"
        color="primary"
        onClick={() => setEditedItem({ id: "add" } as any)}
      >
        <AddIcon />
      </IconButton>
      {!matches && <div className={classes.title}>{recipeName || page}</div>}
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
    </div>
  );
};

const getShowItems = ({
  shoppingItems,
  page,
  searchString,
  showChecked,
}: {
  shoppingItems: Ingredient[] | Recipe[];
  page: Page;
  searchString: string;
  showChecked: boolean;
}) =>
  (showChecked
    ? shoppingItems
    : (shoppingItems as (
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

export default function ItemList({
  page,
  items: shoppingItems,
  searchString,
  actions,
  recipeName,
}: {
  page: Page;
  items?: Ingredient[];
  searchString: string;
  actions: any;
  recipeName?: string;
}) {
  const classes = useStyles();

  const [editedItem, setEditedItem] = useState({} as Ingredient | Recipe);
  const [showChecked, setShowChecked] = useState(true);
  const shownItems = shoppingItems
    ? getShowItems({ shoppingItems, page, searchString, showChecked })
    : [];
  const isEditing = !!editedItem.id;
  return (
    <div>
      {!isEditing && (
        <Buttons
          page={page}
          showChecked={showChecked}
          actions={{ setEditedItem, setShowChecked }}
          recipeName={recipeName}
        />
      )}
      {editedItem.id === "add" && (
        <ShoppingItem page={page} actions={{ ...actions, setEditedItem }} />
      )}
      <List className={classes.root}>
        {shownItems.map((item) =>
          editedItem.id === item.id ? (
            <ShoppingItem
              key={item.id}
              page={page}
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
                  : page === "Recipe List"
                  ? actions.setRecipe
                  : setEditedItem,
                toggleIsBought: isEditing ? () => {} : actions.toggleIsBought,
                toggleIsOnList: isEditing ? () => {} : actions.toggleIsOnList,
              }}
            />
          )
        )}
      </List>
    </div>
  );
}
