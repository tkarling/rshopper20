import React from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import useIngredients from "./hooks/useIngredients";
import ShoppingList from "./components/ShoppingList";

function App() {
  const { shoppingItems, createNewShoppingItem } = useIngredients();
  return (
    <ShoppingList
      shoppingItems={shoppingItems}
      actions={createNewShoppingItem}
    />
  );
}

export default withAuthenticator(App);
