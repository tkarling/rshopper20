import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import useIngredients from "./hooks/useIngredients";
import ShoppingList from "./components/ShoppingList";
import Header from "./components/Header";
import Error, { useErrors } from "./components/Error";
import { Page } from "./types";

const GenericPage = ({ page }: { page: Page }) => <div>{page}</div>;

function App() {
  const [page, setPage] = useState("Shopping List" as Page);
  const { errors, onError, onCloseError } = useErrors();
  const { shoppingItems, ...actions } = useIngredients({ onError });
  const [searchString, setSearchString] = useState("");
  return (
    <div>
      <Header page={page} actions={{ setPage, setSearchString }} />
      {page === "Shopping List" && (
        <ShoppingList
          page={page}
          searchString={searchString}
          shoppingItems={shoppingItems.filter((item) => item.isOnList)}
          actions={actions}
        />
      )}
      {page === "Shopping History" && (
        <ShoppingList
          page={page}
          searchString={searchString}
          shoppingItems={shoppingItems}
          actions={actions}
        />
      )}
      {!["Shopping List", "Shopping History"].includes(page) && (
        <GenericPage page={page} />
      )}
      <Error errors={errors} onCloseError={onCloseError} />
    </div>
  );
}

export default withAuthenticator(App);
