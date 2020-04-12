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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  text: {},
  secondary: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 24
  }
}));

const getSecondary = ({
  item,
  classes
}: {
  item: Ingredient;
  classes: any;
}) => (
  <div className={classes.secondary}>
    <div>{item.aisle}</div>
    <Typography variant="subtitle2" color="primary">
      Base List
    </Typography>
  </div>
);

export default function ShoppingList({
  shoppingItems,
  actions
}: {
  shoppingItems: Ingredient[];
  actions: any;
}) {
  const classes = useStyles();
  const handleToggle = (item: Ingredient) => () => {
    actions.updateShoppingItem({ ...item, isBought: !item.isBought });
  };

  return (
    <div>
      <ShoppingItem actions={actions} />
      <List className={classes.root}>
        {shoppingItems.map(item => {
          const labelId = `ingredient-${item.id}`;

          return (
            <ListItem
              key={item.id}
              role={undefined}
              dense
              button
              onClick={handleToggle(item)}
              // style={{ marginRight: -16 }}
            >
              <ListItemText
                id={labelId}
                primary={`${item.count} ${item.unit || ""} ${item.name}`}
                secondary={getSecondary({ item, classes })}
                className={classes.text}
              />
              <ListItemIcon style={{ minWidth: 0 }}>
                <Checkbox
                  edge="start"
                  checked={item.isBought}
                  tabIndex={-1}
                  // disableRipple
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
        })}
      </List>
    </div>
  );
}
