import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { Ingredient } from "../hooks/useIngredients";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text: {},
  lineTrough: {
    textDecoration: "line-through",
  },
  secondary: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 24,
  },
}));

const lineThroughClass = ({
  item,
  classes,
}: {
  item: Ingredient;
  classes: any;
}) => (item.isBought ? classes.lineTrough : {});

const Primary = ({ item, classes }: { item: Ingredient; classes: any }) => (
  <div className={lineThroughClass({ item, classes })}>
    {`${item.count} ${item.unit || ""} ${item.name}`}
  </div>
);

const Secondary = ({ item, classes }: { item: Ingredient; classes: any }) => {
  return (
    <div className={classes.secondary}>
      <div className={lineThroughClass({ item, classes })}>{item.aisle}</div>
      <Typography variant="subtitle2" color="primary">
        <div className={lineThroughClass({ item, classes })}>Base List</div>
      </Typography>
    </div>
  );
};

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
      onClick={() => actions.setEditedItem(item)}
    >
      <ListItemText
        id={labelId}
        primary={<Primary item={item} classes={classes} />}
        secondary={<Secondary item={item} classes={classes} />}
        className={classes.text}
      />
      <ListItemSecondaryAction style={{ minWidth: 0 }}>
        <Checkbox
          edge="start"
          checked={item.isBought}
          tabIndex={-1}
          inputProps={{ "aria-labelledby": labelId }}
          onClick={() => actions.toggleIsBought(item)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ReadOnlyShoppingItem;