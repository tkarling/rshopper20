import { useEffect, useReducer, useState } from "react";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "../aws-exports";
import { createIngridient, deleteIngridient } from "../graphql/mutations";
import { listIngridients } from "../graphql/queries";
import {
  onCreateIngridient,
  onDeleteIngridient
} from "../graphql/subscriptions";

Amplify.configure(awsConfig);

export type Ingredient = {
  id?: String;
  name: string;
  unit?: string;
  description: string;
  aisle: string;
  count: number;
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
      return action.payload;
    case "ADD_SUBSCRIPTION":
      return [...shoppingItems, action.payload];
    case "DELETE_SUBSCRIPTION":
      return shoppingItems.filter(item => item.id !== action.payload.id);
    default:
      return shoppingItems;
  }
};

const getErrorText = (text: string, err: any) =>
  `${text}: ` +
  err.errors.reduce(
    (acc: string, e: Error) => e.message + (acc ? ", " + acc : ""),
    ""
  );

const useIngredients = () => {
  const [error, setError] = useState("");
  const createNewShoppingItem = async (inputs: Ingredient) => {
    setError("");
    try {
      await API.graphql(graphqlOperation(createIngridient, { input: inputs }));
    } catch (err) {
      const errorText = getErrorText("Error creating item", err);
      setError(errorText);
      throw error;
    }
  };

  const deleteShoppingItem = async (item: Ingredient) => {
    setError("");
    try {
      await API.graphql(
        graphqlOperation(deleteIngridient, { input: { id: item.id } })
      );
    } catch (err) {
      const errorText = getErrorText("Error deleting item", err);
      setError(errorText);
    }
  };
  const [shoppingItems, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getShoppingList();

    const subscriptionCreate = API.graphql(
      graphqlOperation(onCreateIngridient)
    ).subscribe({
      next: (
        eventData: SubscriptionEvent<{ onCreateIngridient: Ingredient }>
      ) => {
        const payload = eventData.value.data.onCreateIngridient;
        dispatch({ type: "ADD_SUBSCRIPTION", payload });
      }
    });

    const subscriptionDelete = API.graphql(
      graphqlOperation(onDeleteIngridient)
    ).subscribe({
      next: (
        eventData: SubscriptionEvent<{ onDeleteIngridient: Ingredient }>
      ) => {
        const payload = eventData.value.data.onDeleteIngridient;
        dispatch({ type: "DELETE_SUBSCRIPTION", payload });
      }
    });

    return () => {
      subscriptionCreate.unsubscribe();
      subscriptionDelete.unsubscribe();
    };
  }, []);

  const getShoppingList = async () => {
    try {
      const shoppingItems = await API.graphql(
        graphqlOperation(listIngridients)
      );
      dispatch({
        type: "QUERY",
        payload: shoppingItems.data.listIngridients.items
      });
    } catch (err) {
      const errorText = getErrorText("Error getting ingredients", err);
      setError(errorText);
    }
  };

  return {
    shoppingItems,
    error,
    createNewShoppingItem,
    deleteShoppingItem
  };
};

export default useIngredients;
