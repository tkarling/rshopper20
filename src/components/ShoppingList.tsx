import React from "react";
import { Ingredient } from "../hooks/useIngredients";
import ShoppingItem from "./ShoppingItem";

function ShoppingList({
  shoppingItems,
  error,
  actions
}: {
  shoppingItems: Ingredient[];
  error: string;
  actions: any;
}) {
  return (
    <div className="App">
      <ShoppingItem actions={actions} />
      <tbody>
        {shoppingItems.map((item, index) => (
          <tr key={item.name + index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.count}</td>
            <td>{item.aisle}</td>
            <td>
              <button
                onClick={async () => {
                  await actions.deleteShoppingItem(item);
                }}
              >
                x
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default ShoppingList;
