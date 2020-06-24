import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as creators from "../../state/actionCreators";
const CategoryPicker = ({ categories, setCategorySearch }) => {
  return (
    <div
      style={{
        margin: "100px"
      }}
    >
      <div data-testid="optionWrapper" className="optionWrapper">
        <button
		  data-testid="categoryButton"
          className="categoryButton"
          onClick={() => {
            setCategorySearch("");
          }}
        >
          All
        </button>
        {categories &&
          categories.map(item => {
            return (
              <button
                data-testid="categoryButton"
                className="categoryButton"
                onClick={() => {
                  setCategorySearch(item.toLowerCase());
                }}
              >
                {item}
              </button>
            );
          })}
      </div>
    </div>
  );
};
export default CategoryPicker;
