import React from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import useIngredients from "./hooks/useIngredients";
import ShoppingList from "./components/ShoppingList";

function App() {
  const {
    shoppingItems,
    error,
    createNewShoppingItem,
    deleteShoppingItem
  } = useIngredients();
  return (
    <ShoppingList
      shoppingItems={shoppingItems}
      error={error}
      actions={{ createNewShoppingItem, deleteShoppingItem }}
    />
  );
}

export default withAuthenticator(App);
