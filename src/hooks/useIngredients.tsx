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

const initialState: AppState = {
  shoppingItems: []
};
const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "QUERY":
      return { ...state, shoppingItems: action.payload };
    case "ADD_SUBSCRIPTION":
      return {
        ...state,
        shoppingItems: [...state.shoppingItems, action.payload]
      };
    case "DELETE_SUBSCRIPTION":
      return {
        ...state,
        shoppingItems: [...state.shoppingItems].filter(
          item => item.id !== action.payload.id
        )
      };
    default:
      return state;
  }
};

const getErrorText = (text: string, err: any) =>
  text +
  ": " +
  err.errors.reduce(
    (acc: string, e: Error) => e.message + (acc ? ", " + acc : ""),
    ""
  );

const useIngredients = () => {
  const [error, setError] = useState("");
  const createNewShoppingItem = async (inputs: Ingredient) => {
    setError("");
    try {
      const newIng = await API.graphql(
        graphqlOperation(createIngridient, { input: inputs })
      );
      console.log("createNewShoppingItem -> newIng", inputs, newIng);
    } catch (err) {
      const errorText = getErrorText("Error creating item", err);
      setError(errorText);
      console.log(errorText, err);
    }
  };

  const deleteShoppingItem = async (item: Ingredient) => {
    setError("");
    try {
      const deleteIng = await API.graphql(
        graphqlOperation(deleteIngridient, { input: { id: item.id } })
      );
      console.log("deleteShoppingItem -> deleteIng", deleteIng);
    } catch (err) {
      const errorText = getErrorText("Error deleting item", err);
      setError(errorText);
      console.log(errorText, err);
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getShoppingList();

    const subscription1 = API.graphql(
      graphqlOperation(onCreateIngridient)
    ).subscribe({
      next: (
        eventData: SubscriptionEvent<{ onCreateIngridient: Ingredient }>
      ) => {
        const payload = eventData.value.data.onCreateIngridient;
        dispatch({ type: "ADD_SUBSCRIPTION", payload });
      }
    });

    const subscription2 = API.graphql(
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
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    };
  }, []);

  const getShoppingList = async () => {
    const shoppingItems = await API.graphql(graphqlOperation(listIngridients));
    dispatch({
      type: "QUERY",
      payload: shoppingItems.data.listIngridients.items
    });
  };
  return {
    shoppingItems: state.shoppingItems,
    error,
    createNewShoppingItem,
    deleteShoppingItem
  };
};

export default useIngredients;
