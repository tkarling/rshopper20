import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForward";

import { Ingredient } from "../hooks/useIngredients";
import { Typography } from "@material-ui/core";
import { Page } from "../types";
import { Recipe } from "../hooks/useRecipes";

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
  page,
  item,
  classes,
}: {
  page: Page;
  item: Ingredient;
  classes: any;
}) => {
  const lineTrough = page === "Shopping List" ? item.isBought : item.isOnList;
  return lineTrough ? classes.lineTrough : {};
};

const Primary = ({
  page,
  item,
  classes,
}: {
  page: Page;
  item: Ingredient;
  classes: any;
}) => (
  <div className={lineThroughClass({ page, item, classes })}>
    {`${item.count || ""} ${item.unit || ""} ${item.name}`}
  </div>
);

const Secondary = ({
  page,
  item,
  classes,
}: {
  page: Page;
  item: Ingredient;
  classes: any;
}) => {
  return (
    <div className={classes.secondary}>
      <div className={lineThroughClass({ page, item, classes })}>
        {item.aisle}
      </div>
      <Typography variant="subtitle2" color="primary">
        <div className={lineThroughClass({ page, item, classes })}>
          {item.recipe}
        </div>
      </Typography>
    </div>
  );
};

const SecondaryRecipe = ({
  page,
  item,
  classes,
}: {
  page: Page;
  item: Recipe;
  classes: any;
}) => {
  return (
    <div className={classes.secondary}>
      <div className={lineThroughClass({ page, item, classes })}>
        {item.url ? "link" : ""}
      </div>
      <Typography variant="subtitle2" color="primary">
        <div className={lineThroughClass({ page, item, classes })}>
          {item.tag}
        </div>
      </Typography>
    </div>
  );
};

const ReadOnlyItem = ({
  page,
  item,
  actions,
}: {
  page: Page;
  item: Ingredient | Recipe;
  actions: any;
}) => {
  const classes = useStyles();
  const isRecipe = page === "Recipes";
  const labelId = `ingredient-${item.id}`;

  const checked =
    page === "Shopping List" ? (item as Ingredient).isBought : item.isOnList;
  const onCheckBoxClick =
    page === "Shopping List"
      ? () => actions.toggleIsBought(item)
      : () => actions.toggleIsOnList(item);

  return (
    <ListItem
      key={item.id}
      role={undefined}
      dense
      button
      onClick={() => actions.onClick(item)}
    >
      <ListItemText
        id={labelId}
        primary={<Primary page={page} item={item} classes={classes} />}
        secondary={
          isRecipe ? (
            <SecondaryRecipe
              page={page}
              item={item as Recipe}
              classes={classes}
            />
          ) : (
            <Secondary page={page} item={item} classes={classes} />
          )
        }
        className={classes.text}
      />
      <ListItemSecondaryAction style={{ minWidth: 0 }}>
        {isRecipe ? (
          <IconButton
            aria-label="submit"
            color="primary"
            onClick={() => actions.openRecipe(item)}
          >
            <ArrowForward />
          </IconButton>
        ) : (
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            inputProps={{ "aria-labelledby": labelId }}
            onClick={onCheckBoxClick}
          />
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ReadOnlyItem;
