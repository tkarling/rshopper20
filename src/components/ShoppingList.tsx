import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Ingredient } from "../hooks/useIngredients";
import ShoppingItem from "./ShoppingItem";
import ReadOnlyShoppingItem from "./ReadOnlyShoppingItem";
import { Page } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 25,
  },
}));

const Buttons = ({
  page,
  showChecked,
  actions,
}: {
  page: Page;
  showChecked: boolean;
  actions: any;
}) => {
  const classes = useStyles();
  const { setEditedItem, setShowChecked } = actions;
  const label = page === "Shopping List" ? "Show Bought" : "Show On List";

  return (
    <div className={classes.buttonContainer}>
      <IconButton
        aria-label="submit"
        color="primary"
        onClick={() => setEditedItem({ id: "add" } as any)}
      >
        <AddIcon />
      </IconButton>
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

export default function ShoppingList({
  page,
  shoppingItems,
  searchString,
  actions,
}: {
  page: Page;
  shoppingItems: Ingredient[];
  searchString: string;
  actions: any;
}) {
  const classes = useStyles();
  const [editedItem, setEditedItem] = useState({} as Ingredient);
  const [showChecked, setShowChecked] = useState(true);
  const shownItems = (showChecked
    ? shoppingItems
    : shoppingItems.filter((item) =>
        page === "Shopping List" ? !item.isBought : !item.isOnList
      )
  ).filter(
    (item) =>
      !searchString ||
      item.name.includes(searchString) ||
      item.aisle.includes(searchString)
  );
  const isEditing = !!editedItem.id;
  return (
    <div>
      {!isEditing && (
        <Buttons
          page={page}
          showChecked={showChecked}
          actions={{ setEditedItem, setShowChecked }}
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
            <ReadOnlyShoppingItem
              key={item.id}
              page={page}
              item={item}
              actions={{
                ...actions,
                setEditedItem: isEditing ? () => {} : setEditedItem,
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
