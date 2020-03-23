import React, { useState } from "react";

const emptyInputs = {
  name: undefined,
  aisle: undefined,
  description: undefined,
  count: 1
};

const ShoppingItem = ({ actions }: { actions: any }) => {
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
  );
};

export default ShoppingItem;
