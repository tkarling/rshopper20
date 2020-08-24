import { useEffect, useReducer } from "react";

import Amplify, { API as rAPI, graphqlOperation } from "aws-amplify";
import awsConfig from "../aws-exports";
import {
  createIngridient,
  deleteIngridient,
  updateIngridient,
} from "../graphql/mutations";
import { listIngridients } from "../graphql/queries";
import {
  onCreateIngridient,
  onDeleteIngridient,
  onUpdateIngridient,
} from "../graphql/subscriptions";
const API: any = rAPI;

Amplify.configure(awsConfig);

export const BASE_LIST = "Base List";

export type Ingredient = {
  id?: string;
  name?: string;
  unit?: string;
  description?: string;
  aisle?: string;
  count?: number;
  isBought?: boolean;
  isOnList?: boolean;
  recipe?: string;
};

export type Recipe = {
  id?: string;
  name: string;
  description?: string;
  isOnList?: boolean;
  tag?: string;
};

type AppState = {
  shoppingItems: Ingredient[];
};

type Action =
  | {
      type: "QUERY";
      payload: Ingredient[];
    }
  | {
      type: "ADD_SUBSCRIPTION";
      payload: Ingredient;
    }
  | {
      type: "DELETE_SUBSCRIPTION";
      payload: Ingredient;
    }
  | {
      type: "UPDATE_SUBSCRIPTION";
      payload: Ingredient;
    };

type SubscriptionEvent<D> = {
  value: {
    data: D;
  };
};

const initialState: Ingredient[] = [];
const reducer = (shoppingItems: Ingredient[], action: Action) => {
  switch (action.type) {
    case "QUERY":
      const { payload } = action;
      return payload.map((item) => ({
        ...item,
        recipe: item.recipe || BASE_LIST,
      }));
    case "ADD_SUBSCRIPTION":
      return [...shoppingItems, action.payload];
    case "DELETE_SUBSCRIPTION":
      return shoppingItems.filter((item) => item.id !== action.payload.id);
    case "UPDATE_SUBSCRIPTION":
      return shoppingItems.map((item) =>
        item.id !== action.payload.id ? item : { ...action.payload }
      );
    default:
      return shoppingItems;
  }
};

const useIngredients = ({ onError }: { onError: (error: Error[]) => void }) => {
  const createNewShoppingItem = async (item: Ingredient) => {
    try {
      await API.graphql(graphqlOperation(createIngridient, { input: item }));
    } catch (err) {
      onError(err.errors);
      throw err;
    }
  };

  const deleteShoppingItem = async (item: Ingredient) => {
    try {
      await API.graphql(
        graphqlOperation(deleteIngridient, { input: { id: item.id } })
      );
    } catch (err) {
      onError(err.errors);
    }
  };

  const updateShoppingItem = async (item: Ingredient) => {
    try {
      await API.graphql(
        graphqlOperation(updateIngridient, {
          input: {
            ...item,
          },
        })
      );
    } catch (err) {
      onError(err.errors);
    }
  };

  const toggleIsBought = async (item: Ingredient) => {
    updateShoppingItem({ ...item, isBought: !item.isBought });
  };

  const toggleIsOnList = async (item: Ingredient) => {
    updateShoppingItem({ ...item, isOnList: !item.isOnList });
  };

  const [shoppingItems, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getShoppingList = async () => {
      try {
        const shoppingItems = await API.graphql(
          graphqlOperation(listIngridients, { limit: 100 })
        );
        dispatch({
          type: "QUERY",
          payload: shoppingItems.data.listIngridients.items.map(
            (item: any) => ({
              ...item,
              recipe: item.recipe || BASE_LIST,
            })
          ),
        });
      } catch (err) {
        onError(err.errors);
      }
    };

    getShoppingList();

    const subscriptionCreate = API.graphql(
      graphqlOperation(onCreateIngridient)
    ).subscribe({
      next: (
        eventData: SubscriptionEvent<{ onCreateIngridient: Ingredient }>
      ) => {
        const payload = eventData.value.data.onCreateIngridient;
        dispatch({ type: "ADD_SUBSCRIPTION", payload });
      },
    });

    const subscriptionDelete = API.graphql(
      graphqlOperation(onDeleteIngridient)
    ).subscribe({
      next: (
        eventData: SubscriptionEvent<{ onDeleteIngridient: Ingredient }>
      ) => {
        const payload = eventData.value.data.onDeleteIngridient;
        dispatch({ type: "DELETE_SUBSCRIPTION", payload });
      },
    });

    const subscriptionUpdate = API.graphql(
      graphqlOperation(onUpdateIngridient)
    ).subscribe({
      next: (eventData: SubscriptionEvent<{ onUpdateIngridient: any }>) => {
        const payload = eventData.value.data.onUpdateIngridient;
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
    shoppingItems,
    createNewShoppingItem,
    deleteShoppingItem,
    updateShoppingItem,
    toggleIsBought,
    toggleIsOnList,
  };
};

export default useIngredients;
