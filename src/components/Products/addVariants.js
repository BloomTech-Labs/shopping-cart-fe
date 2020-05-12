import React, { useState } from "react";
import trashIcon from "../../images/trash_icon.svg";
import * as yup from "yup" 
import {Field, Form, Formik} from "formik"


const AddVariants = (props) => {
  //active = If a user has selected to start adding variants
  const [active, setActive] = useState(false);
  // formData = Holds the input field data until it is submited
  const [formData, setFormData] = useState({
    variantName: "",
      variantOption: "",
      variantPrice: ""

    
  });
  //createdVariants = The state that holds the variants that have been created (All variant data)
  const [createdVariants, setCreatedVariants] = useState([])
  const [errorMessage, setErrorMessage] = useState()

  function changeHandler(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function submitHandler(e){
    e.preventDefault();
    if(!formData.variantName){
      return setErrorMessage("Missing Variant name")
    }
    if(!formData.variantOption){
      return setErrorMessage("Missing option name")
    }
    if(!formData.variantPrice){
      return setErrorMessage("Missing Variant price")
    }
   
    setCreatedVariants([...createdVariants, formData])
    setFormData({
      variantName: formData.variantName,
      variantOption: "",
      variantPrice: ""
      
      
    })
    setErrorMessage("")
    console.log(createdVariants)
  }
  

   function removeVariant(arg) {
    console.log(arg)
    const newState = createdVariants.filter((cv) => {
      return cv.variantOption !== arg;
    });
    return setCreatedVariants(newState);
  }

  function clearVariants(){
    setCreatedVariants([])
    setFormData({variantName: "",
      variantOption: "",
      variantPrice: ""
    })
  }

 



  return (
    <div className="createProductContainer">
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
      </div>
      {active ? (
        <div>
          <form onSubmit={submitHandler} validat>
            <h3>{errorMessage} </h3>
          <label htmlFor="variantName">Variant Name</label>
          <input
            type="text"
            name="variantName"
            placeholder="variant Name Here"
            value={formData.variantName}
            onChange={changeHandler}
            disabled={createdVariants.length >= 1 ? true : false}
          />
          {props.touched && props.error.variantName && <p>This is an error!</p>}
          <h3  onClick={clearVariants}>Clear Varaints</h3>
          <label htmlFor="option">Variant Option</label>
          <input
            type="text"
            name="variantOption"
            placeholder="example: Large"
            value={formData.variantOption}
            onChange={changeHandler}
          />
          <label htmlFor="variantPrice">Variant Price</label>
          <input
            type="number"
            name="variantPrice"
            placeholder="$1.99"
            value={formData.variantPrice}
            onChange={changeHandler}
          />
          <button type="submit" >Create Varaint</button>
          </form>
          {createdVariants ? createdVariants.map(cv=>{
            return <VaraintChild data={cv} removeVariant={removeVariant} key={Math.random() * Math.random()} />
          }):""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddVariants;

const VaraintChild =(props) =>{
  
  return(<div>
    <h1>{props.data.variantName}</h1>
    <p>{props.data.variantOption} / {props.data.variantPrice}</p>
    <img src={trashIcon} onClick={()=>{props.removeVariant(props.data.variantOption)}}/>

    
  </div>)
}