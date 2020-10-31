import { useEffect, useReducer } from "react";

import { API as rAPI, graphqlOperation } from "aws-amplify";
import {
  createRecipe as _createRecipe,
  deleteRecipe as _deleteRecipe,
  updateRecipe as _updateRecipe,
} from "../graphql/mutations";
import { listRecipes } from "../graphql/queries";
import {
  onCreateRecipe,
  onDeleteRecipe,
  onUpdateRecipe,
} from "../graphql/subscriptions";
const API: any = rAPI;

export type Recipe = {
  id?: string;
  name: string;
  description?: string;
  isOnList?: boolean;
  tag?: string;
  url?: string;
  picUrl?: string;
};

// type AppState = {
//   shoppingItems: Ingredient[];
// };

type Action =
  | {
      type: "QUERY";
      payload: Recipe[];
    }
  | {
      type: "ADD_SUBSCRIPTION";
      payload: Recipe;
    }
  | {
      type: "DELETE_SUBSCRIPTION";
      payload: Recipe;
    }
  | {
      type: "UPDATE_SUBSCRIPTION";
      payload: Recipe;
    };

type SubscriptionEvent<D> = {
  value: {
    data: D;
  };
};

const initialState: Recipe[] = [];
const reducer = (recipes: Recipe[], action: Action) => {
  switch (action.type) {
    case "QUERY":
      const { payload } = action;
      return payload.map((item) => ({
        ...item,
        // recipe: item.recipe || BASE_LIST,
      }));
    case "ADD_SUBSCRIPTION":
      return [...recipes, action.payload];
    case "DELETE_SUBSCRIPTION":
      return recipes.filter((item) => item.id !== action.payload.id);
    case "UPDATE_SUBSCRIPTION":
      return recipes.map((item) =>
        item.id !== action.payload.id ? item : { ...action.payload }
      );
    default:
      return recipes;
  }
};

const useRecipes = ({ onError }: { onError: (error: Error[]) => void }) => {
  const createRecipe = async (item: Recipe) => {
    try {
      await API.graphql(graphqlOperation(_createRecipe, { input: item }));
    } catch (err) {
      onError(err.errors);
      throw err;
    }
  };

  const deleteRecipe = async (item: Recipe) => {
    try {
      await API.graphql(
        graphqlOperation(_deleteRecipe, { input: { id: item.id } })
      );
    } catch (err) {
      onError(err.errors);
    }
  };

  const updateRecipe = async (item: Recipe) => {
    try {
      await API.graphql(
        graphqlOperation(_updateRecipe, {
          input: {
            ...item,
          },
        })
      );
    } catch (err) {
      onError(err.errors);
    }
  };

  const toggleIsOnList = async (item: Recipe) => {
    updateRecipe({ ...item, isOnList: !item.isOnList });
  };

  const [recipes, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getShoppingList = async () => {
      try {
        const recipes = await API.graphql(
          graphqlOperation(listRecipes, { limit: 100 })
        );
        dispatch({
          type: "QUERY",
          payload: recipes.data.listRecipes.items.map((item: any) => ({
            ...item,
          })),
        });
      } catch (err) {
        onError(err.errors);
      }
    };

    getShoppingList();

    const subscriptionCreate = API.graphql(
      graphqlOperation(onCreateRecipe)
    ).subscribe({
      next: (eventData: SubscriptionEvent<{ onCreateRecipe: Recipe }>) => {
        const payload = eventData.value.data.onCreateRecipe;
        dispatch({ type: "ADD_SUBSCRIPTION", payload });
      },
    });

    const subscriptionDelete = API.graphql(
      graphqlOperation(onDeleteRecipe)
    ).subscribe({
      next: (eventData: SubscriptionEvent<{ onDeleteRecipe: Recipe }>) => {
        const payload = eventData.value.data.onDeleteRecipe;
        dispatch({ type: "DELETE_SUBSCRIPTION", payload });
      },
    });

    const subscriptionUpdate = API.graphql(
      graphqlOperation(onUpdateRecipe)
    ).subscribe({
      next: (eventData: SubscriptionEvent<{ onUpdateRecipe: any }>) => {
        const payload = eventData.value.data.onUpdateRecipe;
        dispatch({
          type: "UPDATE_SUBSCRIPTION",
          payload,
        });
      },
    });

    return () => {
      subscriptionCreate.unsubscribe();
      subscriptionDelete.unsubscribe();
      subscriptionUpdate.unsubscribe();
    };
  }, [onError]);

  return {
    recipes,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    toggleIsOnList,
  };
};

export default useRecipes;
