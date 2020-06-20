import React from "react"
import { withFormik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { connect } from "react-redux"
import { postOnboard } from "../../state/actionCreators"
import history from "../../history"
import logo from '../../images/register.png'

const WelcomeScreen = (props) => {
  return (
    <div className="welcomeForm">
      <img src = {logo} alt = ""/>
      <h1>Welcome</h1>
      <h2>To finish the account creation process fill out the forms below</h2>
      <Form className="formContainer">
        <main className="sectionContainer">
          <section className="firstSection">
            <section className="business">
              <label htmlFor="businessName" className="label">
                Business Name
              </label>
              <Field
                name="businessName"
                type="text"
                value={props.values.businessName}
                placeholder="Business name"
                className="field"
              />
              {props.touched.businessName && props.errors.businessName && (
                <p className="error">Business Name is required</p>
              )}
            </section>
            <section className="rest">
              <section className="firstHalf">
                <label htmlFor="ownerName" className="label">
                  Owner Name
                </label>
                <Field
                  name="ownerName"
                  type="text"
                  value={props.values.ownerName}
                  placeholder="Owner name"
                  className="field"
                />
                {props.touched.ownerName && props.errors.ownerName && (
                  <p className="error">Owner Name is required</p>
                )}
                <label htmlFor="address" className="label">
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  value={props.values.address}
                  placeholder="Add address"
                  className="field"
                />
                {props.touched.address && props.errors.address && (
                  <p className="error">Address is required</p>
                )}
                <label htmlFor="secondAddress" className="label">
                  Second Address
                </label>
                <Field
                  name="secondAddress"
                  type="text"
                  value={props.values.secondAddress}
                  placeholder="Add second address (if needed)"
                  className="field"
                />
              </section>
              <section className="secondHalf">
                <label htmlFor="city" className="label">
                  City
                </label>
                <Field
                  name="city"
                  type="text"
                  value={props.values.city}
                  placeholder="Add city"
                  className="field"
                />
                {props.touched.city && props.errors.city && (
                  <p className="error">City is required</p>
                )}
                <label htmlFor="state" className="label">
                  State
                </label>
                <Field
                  name="state"
                  type="text"
                  value={props.values.state}
                  placeholder="Add state "
                  className="field"
                />
                {props.touched.state && props.errors.state && (
                  <p className="error">State is required</p>
                )}
                <label htmlFor="zipcode" className="label">
                  Zip Code
                </label>
                <Field
                  name="zipcode"
                  type="text"
                  maxLength={5}
                  placeholder="Add zipcode"
                  value={props.values.zipcode}
                  className="field"
                />
                <ErrorMessage name="zipcode">
                  {(msg) => <div className="error">{msg}</div>}
                </ErrorMessage>
              </section>
            </section>
          </section>
          <section className="secondSection">
            <label htmlFor="hours" className="label">
              Store Hours
            </label>
            <Field
              name="hours"
              type="text"
              value={props.values.hours}
              placeholder="Add Hours of Operation"
              className="field"
            />
            {props.touched.hours && props.errors.hours && (
              <p className="error">Enter Hours of Operation</p>
            )}
            <label htmlFor="curbHours" className="label">
              Curbside Pickup Hours
            </label>
            <Field
              name="curbHours"
              type="text"
              value={props.values.curbHours}
              placeholder="Add curbside hours"
              className="field"
            />
            {props.touched.curbHours && props.errors.curbHours && (
              <p className="error">Enter Curbside hours</p>
            )}
          </section>
        </main>
      <button className="submitButton" type="submit">
        Add Information
      </button>
      </Form>
    </div>
  )
}

const WelcomeScreenForm = withFormik({
  mapPropsToValues({
    businessName,
    ownerName,
    address,
    secondAddress,
    city,
    state,
    zipcode,
    hours,
    curbHours,
  }) {
    return {
      businessName: businessName || "",
      ownerName: ownerName || "",
      address: address || "",
      secondAddress: secondAddress || "",
      city: city || "",
      state: state || "",
      zipcode: zipcode || "",
      hours: hours || "",
      curbHours: curbHours || "",
    }
  },

  validationSchema: Yup.object().shape({
    businessName: Yup.string().required("Enter your business name!"),
    ownerName: Yup.string().required("Enter your name!"),
    address: Yup.string().required("Enter your address!"),
    secondAddress: Yup.string(),
    city: Yup.string().required("Enter your city!"),
    state: Yup.string().required("Enter your state!"),
    zipcode: Yup.string()
      .max(5, "5 digits only!")
      .min(5, "must be 5 digits")
      .required("Zipcode is required"),

    hours: Yup.string().required("Enter your store hours!"),
    curbHours: Yup.string(),
  }),

  handleSubmit: (values, formikBag) => {
    formikBag.props.postOnboard(values)
    history.push("/brandview")
  },
})(WelcomeScreen)

const mapStateToProps = (state) => {
  return {
    businessName: state.onboard.businessName,
    ownerName: state.onboard.ownerName,
    address: state.onboard.address,
    secondAddress: state.onboard.secondAddress,
    city: state.onboard.city,
    state: state.onboard.state,
    zipcode: state.onboard.zipcode,
    hours: state.onboard.hours,
    curbHours: state.onboard.curbHours,
    color: state.onboard.color,
    logo: state.onboard.logo,
  }
}

export default connect(mapStateToProps, { postOnboard })(WelcomeScreenForm)
