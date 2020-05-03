import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import CommentIcon from "@material-ui/icons/Comment";

import { Ingredient } from "../hooks/useIngredients";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  actions,
}: {
  item: Ingredient;
  actions: any;
}) => {
  const classes = useStyles();
  const labelId = `ingredient-${item.id}`;

  return (
    <ListItem
      key={item.id}
      role={undefined}
      dense
      button
      onClick={() => actions.toggleIsBought(item)}
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

export default ReadOnlyShoppingItem;
