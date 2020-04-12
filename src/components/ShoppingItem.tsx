import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    display: "flex"
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column"
  },
  row: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    marginBottom: 10
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "15ch"
  }
}));

const emptyInputs = {
  name: undefined,
  unit: undefined,
  aisle: undefined,
  description: undefined,
  recipe: "BaseList",
  count: 1
};

const ShoppingItem = ({ actions }: { actions: any }) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState(emptyInputs);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<any>
  ) => {
    const payload = { [e.target.name]: e.target.value };
    setInputs(pInputs => ({ ...pInputs, ...payload }));
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("e", e);
    e.stopPropagation();
    e.preventDefault();
    inputs.recipe = undefined as any; // TODO: remove this line after DB supports recipe
    inputs.unit = undefined as any; // TODO: remove this line after DB supports unit
    try {
      await actions.createNewShoppingItem({ ...inputs });
      setInputs(emptyInputs);
    } catch (error) {
      console.error(Error);
    }
  };

  return (
    <div>
      <form>
        <div className={classes.root}>
          <div className={classes.inputsContainer}>
            <div className={classes.row}>
              <TextField
                className={classes.textField}
                style={{ width: 20 }}
                onChange={handleChange}
                type="text"
                name="count"
                placeholder="Count"
                value={inputs.count || ""}
              />
              <TextField
                className={classes.textField}
                style={{ width: 40 }}
                onChange={handleChange}
                type="text"
                name="unit"
                placeholder="Unit"
                value={inputs.unit || ""}
              />
              <TextField
                className={classes.textField}
                style={{ flex: 1 }}
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Name"
                value={inputs.name || ""}
              />
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
                  <MenuItem value="bakery">Bakery</MenuItem>
                  <MenuItem value="dairy">Dairy</MenuItem>
                  <MenuItem value="produce">Produce</MenuItem>
                  <MenuItem value="misc">Misc</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.textField}
                style={{ flex: 1 }}
                InputProps={{
                  readOnly: true
                }}
                onChange={handleChange}
                type="text"
                name="recipe"
                placeholder="Base List"
                value={inputs.recipe || ""}
              />
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <IconButton
              aria-label="submit"
              color="primary"
              onClick={handleSubmit}
            >
              <SaveIcon />
            </IconButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShoppingItem;
