import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import useIngredients from "./hooks/useIngredients";
import ShoppingList from "./components/ShoppingList";
import Header from "./components/Header";
import { Page } from "./types";

const GenericPage = ({ page }: { page: Page }) => <div>{page}</div>;

function App() {
  const [page, setPage] = useState("Shopping List" as Page);
  const {
    shoppingItems,
    error,
    createNewShoppingItem,
    deleteShoppingItem
  } = useIngredients();
  return (
    <div>
      <Header page={page} setPage={setPage} />
      {page === "Shopping List" && (
        <ShoppingList
          shoppingItems={shoppingItems}
          error={error}
          actions={{ createNewShoppingItem, deleteShoppingItem }}
        />
      )}
      {page !== "Shopping List" && <GenericPage page={page} />}
    </div>
  );
}

export default withAuthenticator(App);
