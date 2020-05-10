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
  showBought,
  actions,
}: {
  showBought: boolean;
  actions: any;
}) => {
  const classes = useStyles();
  const { setEditedItem, setShowBought } = actions;

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
            checked={showBought}
            onClick={() => {
              setShowBought((value: boolean) => !value);
            }}
          />
        }
        label="Show Bought"
        labelPlacement="start"
      />
    </div>
  );
};

export default function ShoppingList({
  shoppingItems,
  actions,
}: {
  shoppingItems: Ingredient[];
  actions: any;
}) {
  const classes = useStyles();
  const [editedItem, setEditedItem] = useState({} as Ingredient);
  const [showBought, setShowBought] = useState(true);
  const shownItems = showBought
    ? shoppingItems
    : shoppingItems.filter((item) => !item.isBought);
  const isEditing = !!editedItem.id;

  return (
    <div>
      {!isEditing && (
        <Buttons
          showBought={showBought}
          actions={{ setEditedItem, setShowBought }}
        />
      )}
      {editedItem.id === "add" && (
        <ShoppingItem actions={{ ...actions, setEditedItem }} />
      )}
      <List className={classes.root}>
        {shownItems.map((item) =>
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
                setEditedItem: isEditing ? () => {} : setEditedItem,
                toggleIsBought: isEditing ? () => {} : actions.toggleIsBought,
              }}
            />
          )
        )}
      </List>
    </div>
  );
}
