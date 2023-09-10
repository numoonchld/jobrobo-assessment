import React, { useEffect, useState } from "react";

export default function Admin() {
  const [newCategoryAdd, setNewCategoryAdd] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [subCategoriesToShow, setSubCategoriesToShow] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const allCategoriesNew = await response.json();
      setAllCategories(allCategoriesNew.allCategories);
    };

    getAllCategories();

    const getAllSubCategories = async () => {};
  }, []);

  const handleAddNewCategory = async () => {
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newCategoryAdd.toLowerCase().trim() }),
    };
    const response = await fetch(
      "http://localhost:3000/categories",
      postOptions
    );
    const data = await response.json();
    console.log("here: ", data);
    setAllCategories(data.newCategories);
  };
  const [newSubCategoryAdd, setNewSubCategoryAdd] = useState("");
  const [categoryForSubCategory, setCategoryForSubCategory] = useState("");

  const handleOnChangeSubCategoryCategorySelect = (event) => {
    setCategoryForSubCategory(event.target.value);
  };

  const handleAddNewSubCategory = async () => {
    if (!categoryForSubCategory) {
      alert("Choose category for new subcategory!");
      return;
    }
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subCategory: newSubCategoryAdd.toLowerCase().trim(),
        category: categoryForSubCategory.toLowerCase().trim(),
      }),
    };
    const response = await fetch(
      "http://localhost:3000/categories/subcategory",
      postOptions
    );
    console.log(response);
  };

  return (
    <div className="container">
      <h3 className="mb-5">ADMIN AREA</h3>
      {/* ADD CATEGORY */}
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
      {/* ADD CATEGORY */}

      {/* ADD SUB-CATEGORY */}
      <div className="card mb-5">
        <div className="card-header">Add Sub-Category</div>
        <div className="card-body">
          <label>
            Category
            <select
              onChange={handleOnChangeSubCategoryCategorySelect}
              value={categoryForSubCategory}
            >
              {allCategories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </label>
          <br />
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="new sub category name"
              aria-label="new sub category name"
              aria-describedby="button-addon2"
              value={newSubCategoryAdd}
              onChange={(e) => setNewSubCategoryAdd(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon3"
              onClick={handleAddNewSubCategory}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* ADD SUB-CATEGORY */}

      {/* ADD SUB-SUB-CATEGORY */}
      <div className="card mb-5">
        <div className="card-header">Add Sub-Sub-Category</div>
        <div className="card-body">
          <label>
            Category
            <select>
              {allCategories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Sub-Category
            <select>
              {subCategoriesToShow.map((subCategory) => (
                <option value={subCategory}>{subCategory}</option>
              ))}
            </select>
          </label>
          <br />
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="new sub category name"
              aria-label="new sub category name"
              aria-describedby="button-addon2"
              value={newSubCategoryAdd}
              onChange={(e) => setNewSubCategoryAdd(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon3"
              onClick={handleAddNewSubCategory}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* ADD SUB-SUB-CATEGORY */}

      {/* ADD PRODUCT */}
      <div className="card">
        <div className="card-header">Add Product</div>
        <div className="card-body">
          <label>
            Category
            <select>
              {allCategories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Sub-Category
            <select></select>
          </label>
          <br />
          <label>
            Sub-Sub-Category
            <select></select>
          </label>
          <br />
          <input type="text" />
        </div>
      </div>
      {/* ADD PRODUCT */}
    </div>
  );
}
