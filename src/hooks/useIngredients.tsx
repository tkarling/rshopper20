import React, { useEffect, useReducer } from "react";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "../aws-exports";
import { createIngridient } from "../graphql/mutations";
import { listIngridients } from "../graphql/queries";
import { onCreateIngridient } from "../graphql/subscriptions";

Amplify.configure(awsConfig);

type Ingredient = {
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
      type: "SUBSCRIPTION";
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
    case "SUBSCRIPTION":
      return {
        ...state,
        shoppingItems: [...state.shoppingItems, action.payload]
      };
    default:
      return state;
  }
};

const useIngredients = () => {
  const createNewShoppingItem = async (
    e: React.SyntheticEvent,
    inputs: Ingredient
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const newIng = await API.graphql(
      graphqlOperation(createIngridient, { input: inputs })
    );
    console.log("createNewShoppingItem -> newIng", newIng);
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getShoppingList();

    const subscription = API.graphql(
      graphqlOperation(onCreateIngridient)
    ).subscribe({
      next: (
        eventData: SubscriptionEvent<{ onCreateIngridient: Ingredient }>
      ) => {
        const payload = eventData.value.data.onCreateIngridient;
        dispatch({ type: "SUBSCRIPTION", payload });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getShoppingList = async () => {
    const shoppingItems = await API.graphql(graphqlOperation(listIngridients));
    dispatch({
      type: "QUERY",
      payload: shoppingItems.data.listIngridients.items
    });
  };
  return { shoppingItems: state.shoppingItems, createNewShoppingItem };
};

export default useIngredients;
