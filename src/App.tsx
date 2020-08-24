import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import useIngredients, { BASE_LIST } from "./hooks/useIngredients";
import ItemList from "./components/ItemList";
import Header from "./components/Header";
import Error, { useErrors } from "./components/Error";
import { Page } from "./types";

const GenericPage = ({ page }: { page: Page }) => <div>{page}</div>;

function App() {
  const [page, setPageId] = useState("Shopping List" as Page);
  const [shownRecipe, setShownRecipe] = useState("");
  const [searchString, setSearchString] = useState("");

  const { errors, onError, onCloseError } = useErrors();
  const { shoppingItems, ...actions } = useIngredients({ onError });
  const [recipes] = useState([
    { id: "Rosolli", name: "Rosolli", aisle: "Christmas", isOnList: false },
  ]);
  const common = { page, shownRecipe, searchString, actions: actions as any };

  const setPage = (newPage: Page, newRecipe = "") => {
    setPageId(newPage);
    setShownRecipe(newRecipe);
  };

  return (
    <div>
      <Header
        page={page}
        actions={{ setPage, setSearchString }}
        shownRecipe={shownRecipe}
      />
      {page === "Shopping List" && (
        <ItemList
          {...common}
          items={shoppingItems.filter((item) => item.isOnList)}
        />
      )}
      {page === "Shopping History" && (
        <ItemList
          {...common}
          items={shoppingItems.filter((item) => item.recipe === BASE_LIST)}
        />
      )}
      {page === "Recipies" && (
        <ItemList
          {...common}
          items={recipes}
          actions={{
            ...(actions as any),
            setRecipe: (recipe: any) => {
              setPage("Recipe", recipe.name);
            },
          }}
        />
      )}
      {page === "Recipe" && <ItemList {...common} items={shoppingItems} />}
      {!["Shopping List", "Shopping History", "Recipies", "Recipe"].includes(
        page
      ) && <GenericPage page={page} />}
      <Error errors={errors} onCloseError={onCloseError} />
    </div>
  );
}

export default withAuthenticator(App);
