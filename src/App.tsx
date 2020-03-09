import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import useIngredients from "./hooks/useIngredients";

function App() {
  const [inputs, setInputs] = useState({
    name: "",
    aisle: "",
    description: "",
    count: 1
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = { [e.target.name]: e.target.value };
    setInputs(pInputs => ({ ...pInputs, ...payload }));
  };

  const { shoppingItems, createNewShoppingItem } = useIngredients();

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
          onClick={e => createNewShoppingItem(e, inputs)}
          className="float-left"
        >
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
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default withAuthenticator(App);
