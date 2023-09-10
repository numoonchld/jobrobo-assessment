import React, { useEffect, useState } from "react";

export default function AddCategory() {
  const [newCategoryAdd, setNewCategoryAdd] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const allCategoriesNew = await response.json();
      console.log(allCategoriesNew.allCategories);
      setAllCategories(allCategoriesNew.allCategories);
    };

    getAllCategories();
  }, [newCategoryAdd]);

  const handleAddNewCategory = async () => {
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newCategoryAdd }),
    };
    const response = await fetch(
      "http://localhost:3000/categories",
      postOptions
    );
    console.log(response);
  };
  return (
    <div className="card mb-5">
      <div className="card-header">Add Category</div>
      <div className="card-body">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="new category name"
            aria-label="new category name"
            aria-describedby="button-addon2"
            value={newCategoryAdd}
            onChange={(e) => setNewCategoryAdd(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleAddNewCategory}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
