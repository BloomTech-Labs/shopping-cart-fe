import React, { useState } from "react";
import trashIcon from "../../images/trash_icon.svg";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

const AddVariants = (props) => {
  //active = If a user has selected to start adding variants
  const [ active, setActive ] = useState(false);
  // formData = Holds the input field data until it is submited
  const [ formData, setFormData ] = useState({
    variantName: "",
    variantOption: "",
    variantPrice: "",
  });
  //createdVariants = The state that holds the variants that have been created (All variant data)
  const [ createdVariants, setCreatedVariants ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState();

  function changeHandler(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function submitHandler(e) {
    e.preventDefault();
    if (!formData.variantName) {
      return setErrorMessage("Missing Variant name");
    }
    if (!formData.variantOption) {
      return setErrorMessage("Missing option name");
    }
    if (!formData.variantPrice) {
      return setErrorMessage("Missing Variant price");
    }

    setCreatedVariants([ ...createdVariants, formData ]);
    setFormData({
      variantName: formData.variantName,
      variantOption: "",
      variantPrice: "",
    });
    setErrorMessage("");
    console.log(createdVariants);
  }

  function removeVariant(arg) {
    console.log(arg);
    const newState = createdVariants.filter((cv) => {
      return cv.variantOption !== arg;
    });
    return setCreatedVariants(newState);
  }

  function clearVariants() {
    setCreatedVariants([]);
    setFormData({
      variantName: "",
      variantOption: "",
      variantPrice: "",
    });
  }

  return (
    <div className="masterContainer">
      <div className="createProductContainer">
        <div className="HeaderContainer">
          <div className="textContainer">
            <h3>Variants:</h3>
            <p>
              Product options a customer can choose from. <a>Learn More</a>
            </p>
          </div>
          <button
            onClick={() => {
              setActive(true);
            }}
            className={active ? "disabled" : "variantButton"}
          >
            Create Variants
          </button>
        </div>

        {active ? (
          <div className="VariantFormContainer">
            <form onSubmit={submitHandler}>
              <h3>{errorMessage} </h3>
              <div className="variantNameContainer">
                <div className="inputContainer">
                  <label htmlFor="variantName">Variant Name</label>
                  <input
                    className={
                      createdVariants.length >= 1 ? "inputDisabled" : ""
                    }
                    type="text"
                    name="variantName"
                    placeholder="Variant Name Here"
                    value={formData.variantName}
                    onChange={changeHandler}
                    disabled={createdVariants.length >= 1 ? true : false}
                  />
                </div>
                <p
                  className={
                    createdVariants.length >= 1 ? (
                      "clearBTN"
                    ) : (
                      "clearBTN clearDisabled "
                    )
                  }
                  onClick={clearVariants}
                >
                  Clear Varaints
                </p>
              </div>
              <div className="addVariantContainer">
                <div className="inputContainer">
                  <label htmlFor="option">Variant Option</label>
                  <input
                    type="text"
                    name="variantOption"
                    placeholder="example: Large"
                    value={formData.variantOption}
                    onChange={changeHandler}
                  />
                </div>
                <div className="inputContainer">
                  <label htmlFor="variantPrice">Variant Price</label>
                  <input
                    type="number"
                    name="variantPrice"
                    placeholder="Example: 1.99"
                    value={formData.variantPrice}
                    onChange={changeHandler}
                  />
                </div>
                <div className="addBTNContainer">
                  <button type="submit">Add Option</button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
      {createdVariants ? (
        createdVariants.map((cv) => {
          return (
            <VaraintChild
              data={cv}
              removeVariant={removeVariant}
              key={Math.random() * Math.random()}
            />
          );
        })
      ) : (
        ""
      )}
    </div>
  );
};

export default AddVariants;

const VaraintChild = (props) => {
  return (
    <div className="cardContainer">
      <p>
        {props.data.variantName}: {props.data.variantOption} | ${props.data.variantPrice}
      </p>
      <img
        src={trashIcon}
        onClick={() => {
          props.removeVariant(props.data.variantOption);
        }}
      />
    </div>
  );
};
