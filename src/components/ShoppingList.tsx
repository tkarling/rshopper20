import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

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
      <ShoppingItem actions={actions} />
      <List className={classes.root}>
        {shoppingItems.map((item) =>
          editedItem?.id === item.id ? (
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
                setEditedItem: editedItem?.id ? () => {} : setEditedItem,
                toggleIsBought: editedItem?.id
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
