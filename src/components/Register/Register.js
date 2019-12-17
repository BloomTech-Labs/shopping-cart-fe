import React, { useState } from "react";
import { List, InputItem, Button, WhiteSpace, Flex, Toast } from "antd-mobile";
import { createForm } from "rc-form";
import "./Register.css";

const BasicInputExample = props => {
  const [confirmDirty] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        console.log(values);
      } else {
        window.alert("Validation failed");
      }
    });
  };
  function showToast(error) {
    Toast.info(error, 1);
  }
  const { getFieldProps, getFieldError } = props.form;
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      //   callback('Two passwords that you enter is inconsistent!');
      setErrMessage("passwords do not match!");
    } else {
      callback();
      setErrMessage("");
    }
  };
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  return (
    <form>
      <div className="flex-container">
        <div style={{ textAlign: "center" }}>
          PureRetail Logo
        </div>
        <div className="form">
          <List
            // renderHeader={() => "Register new account"}
            renderHeader={() => <div>Register new<br/>account</div>}
            renderFooter={() =>
              getFieldError("number", "confirm") &&
              getFieldError("number", "confirm").join(",")
            }
          >
            <InputItem
              {...getFieldProps("number", {
                rules: [
                  {
                    required: true,
                    message: "Please input number"
                  }
                ]
              })}
              clear
              error={!!getFieldError("number")}
              onErrorClick={() => {
                showToast(getFieldError("number").join("、"));
              }}
              type="number"
              placeholder="Phone number"
            />
            <WhiteSpace />
            <InputItem
              {...getFieldProps("password", {
                rules: [
                  {
                    required: true
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              })}
              type="password"
              placeholder="Password"
            />
            <WhiteSpace />
            <InputItem
              {...getFieldProps("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              })}
              clear
              error={!!getFieldError("confirm")}
              onErrorClick={() => {
                showToast(getFieldError("confirm").join("、"));
              }}
              type="password"
              placeholder="Confirm password"
            />
            <WhiteSpace />
          </List>
          <Flex justify="center">
            <Button type="primary" size="medium" inline onClick={handleSubmit}>
              Register
            </Button>
          </Flex>
          <WhiteSpace />
        </div>
        <div>{errMessage}</div>
        <div>
          or <a href="www">login</a> instead
        </div>
      </div>
    </form>
  );
};
const BasicInputExampleWrapper = createForm()(BasicInputExample);
export default BasicInputExampleWrapper;
