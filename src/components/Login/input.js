import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import React from 'react';
import './login.css';
import { ConfirmButton } from '../Reusable/index'

class BasicInputExample extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handleClick = () => {
    this.inputRef.focus();
  }
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div>
        <List 
        style={{width:'80vw'}}
        renderHeader={() => ''}>
          <InputItem
           placeholder="Phone number"
           type="phone"
           style={{background:'transparent', border:'none', borderBottom: '2px solid #BFD7EA', textAlign: 'center'}}
          ></InputItem>

          <InputItem
          placeholder="Password"
          type="password"
          style={{background:'transparent', border:'none', borderBottom: '2px solid #BFD7EA', textAlign: 'center'}}
          ></InputItem>
          
          {/* <Button
          type="primary"
          style={{backgroundColor:'#000', color:'#fff', borderRadius: '50px', marginTop: '20px' }}
          >Log in</Button> */}
          <ConfirmButton text = 'Log in'/>
        </List>
        </div>
    )
       
}
};

createForm()(BasicInputExample);
export default BasicInputExample;