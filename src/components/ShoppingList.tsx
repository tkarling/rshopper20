import React, { useState } from "react";
import { Ingredient } from "../hooks/useIngredients";

const emptyInputs = {
  name: undefined,
  aisle: undefined,
  description: undefined,
  count: 1
};

function ShoppingList({
  shoppingItems,
  error,
  actions
}: {
  shoppingItems: Ingredient[];
  error: string;
  actions: any;
}) {
  const [inputs, setInputs] = useState(emptyInputs);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = { [e.target.name]: e.target.value };
    setInputs(pInputs => ({ ...pInputs, ...payload }));
  };
  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    actions.createNewShoppingItem({ ...inputs });
    setInputs(emptyInputs);
  };

  return (
    <div className="App">
      <form>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
          value={inputs.name || ""}
        />
        <input
          onChange={handleChange}
          type="text"
          name="description"
          placeholder="Description"
          value={inputs.description || ""}
        />
        <input
          onChange={handleChange}
          type="text"
          name="aisle"
          placeholder="aisle"
          value={inputs.aisle || ""}
        />
        <button type="submit" onClick={handleAddItem} className="float-left">
          Add Item
        </button>
      </form>
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
