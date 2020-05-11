import React, { useState } from "react";
import create from "antd/lib/icon/IconFont";
import trashIcon from "../../images/trash_icon.svg";



const AddVariants = () => {
  //active = If a user has selected to start adding variants
  const [active, setActive] = useState(false);
  // formData = Holds the input field data until it is submited
  const [formData, setFormData] = useState({
    variantName: "",
    variantDetails: {
      option: "",
      variantPrice: ""
    }
    
  });
  //createdVariants = The state that holds the variants that have been created (All variant data)
  const [createdVariants, setCreatedVariants] = useState([])

  const [errorMessage, setErrorMessage] = useState()

  function changeHandler(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //because the keys in FormData are in another object the change hander had to be made for each key to access them correctly
  function optionChangeHandler(e) {
    e.preventDefault();
    setFormData({...formData, "variantDetails": {...formData.variantDetails, ["option"]: e.target.value}})
  }

  function priceChangeHandler(e) {
    e.preventDefault();
    setFormData({...formData, "variantDetails": {...formData.variantDetails, ["variantPrice"]: e.target.value}})
  }
  function submitHandler(e){
    e.preventDefault();
    if(!formData.variantName){
      return setErrorMessage("Missing Variant name")
    }
    if(!formData.variantDetails.option){
      return setErrorMessage("Missing option name")
    }
    if(!formData.variantDetails.variantPrice){
      return setErrorMessage("Missing Variant price")
    }
   
    setCreatedVariants([...createdVariants, formData])
    setFormData({
      variantName: formData.variantName,
      variantDetails: {
        option: "",
        variantPrice: ""
      }
      
    })
    setErrorMessage("")
    console.log(createdVariants)
  }
  

  async function removeVariant(arg) {
    console.log(arg)
    const newState = await createdVariants.filter((cv) => {
      return cv.variantDetails.option !== arg;
    });
    return setCreatedVariants(newState);
  }

  function clearVariants(){
    setCreatedVariants([])
    setFormData({variantName: "",
    variantDetails: {
      option: "",
      variantPrice: ""
    }})
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
          <form onSubmit={submitHandler}>
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
          <h3  onClick={clearVariants}>Clear Varaints</h3>
          <label htmlFor="option">Variant Option</label>
          <input
            type="text"
            name="option"
            placeholder="example: Large"
            value={formData.variantDetails.option}
            onChange={optionChangeHandler}
          />
          <label htmlFor="variantPrice">Variant Price</label>
          <input
            type="number"
            name="variantPrice"
            placeholder="$1.99"
            value={formData.variantDetails.variantPrice}
            onChange={priceChangeHandler}
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
    <p>{props.data.variantDetails.option} / {props.data.variantDetails.variantPrice}</p>
    <img src={trashIcon} onClick={()=>{props.removeVariant(props.data.variantDetails.option)}}/>

    
  </div>)
}