import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

import { Ingredient, BASE_LIST } from "../hooks/useIngredients";
import { Page } from "../types";
import { Recipe } from "../hooks/useRecipes";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    display: "flex",
    border: "1px solid #3f51b5",
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  row: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    marginBottom: 10,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "15ch",
  },
}));

const AISLES = ["Bakery", "Dairy", "Produce", "Misc"];

const Field = ({
  name,
  width = "flex",
  inputs,
  handleChange,
  readOnly = false,
}: {
  name: string;
  width?: string;
  inputs: any;
  handleChange: (event: any) => void;
  readOnly?: boolean;
}) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      style={width !== "flex" ? { width: Number(width) } : { flex: 1 }}
      onChange={handleChange}
      type="text"
      name={name.toLowerCase()}
      placeholder={name}
      value={inputs[name.toLowerCase()] || ""}
      inputProps={{
        readOnly,
      }}
    />
  );
};

const emptyInputs = ({
  isRecipe,
  shownRecipe,
}: {
  isRecipe: boolean;
  shownRecipe?: string;
}) =>
  isRecipe
    ? {}
    : {
        recipe: shownRecipe || BASE_LIST,
        count: 1,
      };

const EditableIngredient = ({
  inputs,
  handleChange,
  classes,
}: {
  inputs: any;
  handleChange: any;
  classes: any;
}) => {
  const common = { inputs, handleChange };
  return (
    <>
      <div className={classes.row}>
        <Field name="Count" width="20" {...common} />
        <Field name="Unit" width="40" {...common} />
        <Field name="Name" {...common} />
      </div>
      <div className={classes.row}>
        <FormControl>
          <Select
            className={classes.textField}
            name="aisle"
            labelId="aisle"
            id="aisle"
            value={inputs.aisle || ""}
            onChange={handleChange}
          >
            {AISLES.map((aisle) => (
              <MenuItem key={aisle} value={aisle.toLowerCase()}>
                {aisle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Field name="Recipe" {...common} readOnly={true} />
      </div>
    </>
  );
};

const EditableRecipe = ({
  inputs,
  handleChange,
  classes,
}: {
  inputs: any;
  handleChange: any;
  classes: any;
}) => {
  const common = { inputs, handleChange };
  return (
    <>
      <div className={classes.row}>
        <Field name="Name" {...common} />
      </div>
      <div className={classes.row}>
        <Field name="Tag" {...common} />
        <Field name="Url" {...common} />
      </div>
    </>
  );
};

const EditableItem = ({
  page,
  shownRecipe,
  item,
  actions,
}: {
  page: Page;
  shownRecipe: string;
  item?: Ingredient;
  actions: {
    createNewShoppingItem: (item: Ingredient | Recipe) => Promise<void>;
    updateShoppingItem: (item: Ingredient | Recipe) => Promise<void>;
    deleteShoppingItem: (item: Ingredient | Recipe) => Promise<void>;
    toggleIsOnList: (item: Ingredient | Recipe) => Promise<void>;
    setEditedItem: (item: Ingredient | Recipe) => void;
  };
}) => {
  const classes = useStyles();
  const isRecipe = page === "Recipes";
  const [inputs, setInputs] = useState(() =>
    emptyInputs({ isRecipe, shownRecipe })
  );

  useEffect(() => {
    if (item) {
      setInputs({
        ...item,
        recipe: isRecipe ? undefined : shownRecipe || BASE_LIST,
      } as any);
    }
  }, [isRecipe, item, shownRecipe]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<any>
  ) => {
    const payload = { [e.target.name]: e.target.value };
    setInputs((pInputs) => ({ ...pInputs, ...payload }));
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (item) {
        await actions.updateShoppingItem({ ...item, ...inputs });
        actions.setEditedItem({} as Ingredient);
      } else {
        await actions.createNewShoppingItem({ ...inputs, isOnList: !isRecipe });
      }
      setInputs(emptyInputs({ isRecipe, shownRecipe }));
      actions.setEditedItem({});
    } catch (error) {
      console.error("Error submitting item", error);
    }
  };
  const handleDeleteClose = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (item) {
        if (page === "Shopping List") {
          await actions.toggleIsOnList(item);
        } else {
          await actions.deleteShoppingItem(item);
        }
      }
      actions.setEditedItem({});
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const props = { inputs, handleChange, classes };
  return (
    <div>
      <form>
        <div className={classes.root}>
          <div className={classes.inputsContainer}>
            {isRecipe ? (
              <EditableRecipe {...props} />
            ) : (
              <EditableIngredient {...props} />
            )}
          </div>
          <div className={classes.buttonContainer}>
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={handleDeleteClose}
              style={{ padding: "8px 12px" }}
            >
              {item ? <DeleteIcon /> : <CloseIcon />}
            </IconButton>
            <IconButton
              aria-label="submit"
              color="primary"
              onClick={handleSubmit}
            >
              {item ? <SaveIcon /> : <AddIcon />}
            </IconButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditableItem;
