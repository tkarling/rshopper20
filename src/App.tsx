import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import useIngredients, { BASE_LIST } from "./hooks/useIngredients";
import useRecipes from "./hooks/useRecipes";
import ItemList from "./components/ItemList";
import Header from "./components/Header";
import Error, { useErrors } from "./components/Error";
import { Page } from "./types";

const GenericPage = ({ page }: { page: Page }) => <div>{page}</div>;

function App() {
  const [page, setPageId] = useState("Recipes" as Page);
  const [shownRecipe, setShownRecipe] = useState("");
  const [searchString, setSearchString] = useState("");

  const { errors, onError, onCloseError } = useErrors();
  const { shoppingItems, ...actions } = useIngredients({ onError });
  const { recipes, ...recipeActions } = useRecipes({ onError });
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
      {page === "Recipes" && (
        <ItemList
          {...common}
          items={recipes}
          actions={{
            ...(recipeActions as any),
            createNewShoppingItem: recipeActions.createRecipe,
            updateShoppingItem: recipeActions.updateRecipe,
            deleteShoppingItem: recipeActions.deleteRecipe,
            setRecipe: (recipe: any) => {
              setPage("Recipe", recipe.name);
            },
            openRecipe: (recipe: any) => {
              if (recipe.url) {
                window.open(recipe.url);
              } else {
                console.log("no url for", recipe);
              }
            },
          }}
        />
      )}
      {page === "Recipe" && <ItemList {...common} items={shoppingItems} />}
      {!["Shopping List", "Shopping History", "Recipes", "Recipe"].includes(
        page
      ) && <GenericPage page={page} />}
      <Error errors={errors} onCloseError={onCloseError} />
    </div>
  );
}

export default withAuthenticator(App);
