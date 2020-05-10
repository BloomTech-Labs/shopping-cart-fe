import React, { useState } from "react";

const AddVariants = () => {
  //active = Add variants button was selected (first time)
  const [active, setActive] = useState(false);
  const [firstVariantAdded, setFirstVariantAdded] = useState(false);
  const [formData, setFormData] = useState({
    variantName: "",
    option: "",
    variantPrice: "",
  });

  function changeHandler(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="variantContainer">
      <div className="HeaderContainer">
        <h3>Variants:</h3>
        <p>
          Product options a customer can choose from. <a>Learn More</a>
        </p>
        <button
          onClick={() => {
            setActive(true);
          }}
          className={active ? "disabled" : "variantButton"}
        >
          Add Variants
        </button>
        <button
          onClick={() => {
            console.log(active);
          }}
        >
          state
        </button>
      </div>
      {active ? (
        <div>
          <input
            type="text"
            name="variantName"
            placeholder="variant Name Here"
            value={formData.variantName}
            onChange={changeHandler}
          />

          <input
            type="text"
            name="option"
            placeholder="example: Large"
            value={formData.option}
            onChange={changeHandler}
          />

          <input
            type="number"
            name="variantPrice"
            placeholder="$1.99"
            value={formData.variantPrice}
            onChange={changeHandler}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddVariants;
