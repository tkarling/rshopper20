import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import CommentIcon from "@material-ui/icons/Comment";

import { Ingredient } from "../hooks/useIngredients";
import ShoppingItem from "./ShoppingItem";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  text: {},
  secondary: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 24,
  },
}));

const Secondary = ({ item, classes }: { item: Ingredient; classes: any }) => (
  <div className={classes.secondary}>
    <div>{item.aisle}</div>
    <Typography variant="subtitle2" color="primary">
      Base List
    </Typography>
  </div>
);

const ReadOnlyShoppingItem = ({
  item,
  onCheckboxToggle: handleToggle,
}: {
  item: Ingredient;
  onCheckboxToggle: (item: Ingredient) => void;
}) => {
  const classes = useStyles();
  const labelId = `ingredient-${item.id}`;

  return (
    <ListItem
      key={item.id}
      role={undefined}
      dense
      button
      onClick={() => handleToggle(item)}
      // style={{ marginRight: -16 }}
    >
      <ListItemText
        id={labelId}
        primary={`${item.count} ${item.unit || ""} ${item.name}`}
        secondary={<Secondary item={item} classes={classes} />}
        className={classes.text}
      />
      <ListItemIcon style={{ minWidth: 0 }}>
        <Checkbox
          edge="start"
          checked={item.isBought}
          tabIndex={-1}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </ListItemIcon>
      {/* <ListItemSecondaryAction>
    <IconButton edge="end" aria-label="comments">
      <CommentIcon />
    </IconButton>
  </ListItemSecondaryAction> */}
    </ListItem>
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
  const handleCheckboxToggle = (item: Ingredient) => {
    actions.updateShoppingItem({ ...item, isBought: !item.isBought });
  };

  return (
    <div>
      <ShoppingItem actions={actions} />
      <List className={classes.root}>
        {shoppingItems.map((item) => {
          return (
            <ReadOnlyShoppingItem
              key={item.id}
              item={item}
              onCheckboxToggle={handleCheckboxToggle}
            />
          );
        })}
      </List>
    </div>
  );
}
