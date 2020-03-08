import React, { useEffect, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { createIngridient } from "./graphql/mutations";
import { listIngridients } from "./graphql/queries";
import { onCreateIngridient } from "./graphql/subscriptions";

Amplify.configure(awsConfig);

type Ingredient = {
  name: string;
  description: string;
  aisle: string;
  count: number;
};

type AppState = {
  shoppingItems: Ingredient[];
  formData: Ingredient;
};

type Action =
  | {
      type: "QUERY";
      payload: Ingredient[];
    }
  | {
      type: "SUBSCRIPTION";
      payload: Ingredient;
    }
  | {
      type: "SET_FORM_DATA";
      payload: { [field: string]: string };
    };

type SubscriptionEvent<D> = {
  value: {
    data: D;
  };
};

const initialState: AppState = {
  shoppingItems: [],
  formData: {
    name: "",
    aisle: "",
    description: "",
    count: 1
  }
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
    case "SET_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
};
function App() {
  const createNewShoppingItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, description, aisle } = state.formData;
    const shoppingItem = {
      name,
      // description,
      aisle,
      count: 1
    };
    console.log("createNewShoppingItem -> shoppingItem", shoppingItem);
    const newIng = await API.graphql(
      graphqlOperation(createIngridient, { input: shoppingItem })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "SET_FORM_DATA",
      payload: { [e.target.name]: e.target.value }
    });

  return (
    <div className="App">
      <form>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="description"
          placeholder="Description"
        />
        <input
          onChange={handleChange}
          type="text"
          name="aisle"
          placeholder="aisle"
        />
        <button
          type="submit"
          onClick={createNewShoppingItem}
          className="float-left"
        >
          Add Item
        </button>
      </form>
      <tbody>
        {state.shoppingItems.map((item, index) => (
          <tr key={item.name + index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.count}</td>
            <td>{item.aisle}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default withAuthenticator(App);
