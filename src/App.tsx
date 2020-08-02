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
  const [shownRecipe, setShownRecipe] = useState("");
  const [searchString, setSearchString] = useState("");

  const { errors, onError, onCloseError } = useErrors();
  const { shoppingItems, ...actions } = useIngredients({ onError });
  const [recipes] = useState([
    { id: "Rosolli", name: "Rosolli", aisle: "Christmas", isOnList: false },
  ]);
  const common = { page, searchString, actions };

  return (
    <div>
      <Header
        page={page}
        actions={{ setPage, setSearchString }}
        recipeName={shownRecipe}
      />
      {page === "Shopping List" && (
        <ShoppingList
          {...common}
          shoppingItems={shoppingItems.filter((item) => item.isOnList)}
        />
      )}
      {page === "Shopping History" && (
        <ShoppingList {...common} shoppingItems={shoppingItems} />
      )}
      {page === "Recipe List" && (
        <ShoppingList
          {...common}
          shoppingItems={recipes}
          actions={{
            toggleIsOnList: () => console.log("called toggleIsOnList"),
            setRecipe: (recipe: any) => {
              setShownRecipe(recipe.name);
              setPage("Recipe");
            },
          }}
        />
      )}
      {page === "Recipe" && (
        <ShoppingList
          {...common}
          shoppingItems={shoppingItems.filter((item) => {
            console.log("App -> shownRecipe", shownRecipe, item);
            return item.recipe === shownRecipe;
          })}
          recipeName={shownRecipe}
        />
      )}
      {!["Shopping List", "Shopping History", "Recipe List", "Recipe"].includes(
        page
      ) && <GenericPage page={page} />}
      <Error errors={errors} onCloseError={onCloseError} />
    </div>
  );
}

export default withAuthenticator(App);
