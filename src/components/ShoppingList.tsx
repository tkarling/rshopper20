import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";

import { Ingredient } from "../hooks/useIngredients";
import ShoppingItem from "./ShoppingItem";
import ReadOnlyShoppingItem from "./ReadOnlyShoppingItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ShoppingList({
  shoppingItems,
  actions,
}: {
  shoppingItems: Ingredient[];
  actions: any;
}) {
  const classes = useStyles();
  const [editedItem, setEditedItem] = useState({} as Ingredient);

  return (
    <div>
      {!editedItem.id && (
        <IconButton
          aria-label="submit"
          color="primary"
          onClick={() => setEditedItem({ id: "add" } as any)}
        >
          <AddIcon />
        </IconButton>
      )}
      {editedItem.id === "add" && (
        <ShoppingItem actions={{ ...actions, setEditedItem }} />
      )}
      <List className={classes.root}>
        {shoppingItems.map((item) =>
          editedItem.id === item.id ? (
            <ShoppingItem
              key={item.id}
              item={item}
              actions={{ ...actions, setEditedItem }}
            />
          ) : (
            <ReadOnlyShoppingItem
              key={item.id}
              item={item}
              actions={{
                ...actions,
                setEditedItem: editedItem.id ? () => {} : setEditedItem,
                toggleIsBought: editedItem.id
                  ? () => {}
                  : actions.toggleIsBought,
              }}
            />
          )
        )}
      </List>
    </div>
  );
}
