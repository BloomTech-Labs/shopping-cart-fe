import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as creators from "../state/actionCreators";
import {
  Form,
  Input,
  Icon,
  Button,
  message,
  Upload
} from "antd";

import "../less/index.less";
import axios from "axios";
import AxiosAuth from "./Auth/axiosWithAuth";
import history from "../history";

function UpdateItem(props) {
  const [item, setItem] = useState([]);
  console.log(item)
  const itemId = props.match.params.id;
  const productURL =
  `https://shopping-cart-eu3-staging.herokuapp.com/api/store/products/${itemId}`;
  useEffect(() => {
    AxiosAuth()
      .get(
        `https://shopping-cart-eu3-staging.herokuapp.com/api/store/products/${itemId}`
      )
      .then(res => {
        setItem(res.data);
      });
  }, [itemId]);


const test = item && item.images && item.images.length && item.images.map(i=>{
  return i
})
const myArray = test && test.length && test.map((str, index) => ({ url: str, id: index + 1 , name:'image.png'}));
console.log(myArray)


  const [fileList, setFileList] = useState(
[    {
      uid: '-1',
      name: 'image.png',
     
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
     
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
     
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },]

  );
  console.log(fileList)
  const [cloudList, setCloudList] = useState([]);

  const handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-4);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    const image = new FormData();
    image.append("upload_preset", "pure-retail");
    image.append("file", file);
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    };
    axios
      .post("https://api.cloudinary.com/v1_1/pureretail/upload", image, config)
      .then(res => {
        const secureUrl = res.data.secure_url;
        const newList = [...cloudList, secureUrl];
        setCloudList(newList);
      });
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock || 0,
        images: cloudList
      };
      if (!err) {
        AxiosAuth()
          .put(productURL, payload)
          .then(res => {
            message.success("item added");
          })
          .catch(error => {
            message.error(error.message);
          });
      } else {
        message.error("Validation failed");
      }
    });
  };

  const toStore = e => {
    e.preventDefault();
    history.push("/createstore");
  };

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  return (
    <div className="cover">
      <div id="header">
        <h2 id="get-started">
          Upload new
          <br />
          store item
        </h2>
      </div>
      <div>
        <Upload
            fileList={fileList}
            customRequest={dummyRequest}
            //multiple
            onChange={handleChange}
          >
            <Button>
              <Icon type='upload' /> Upload Photos
            </Button>
          </Upload>
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator("name", {
            initialValue: item.name,
            rules: [
              {
                message: "Name"
              },
              {
                required: true,
                message: "Enter a Name"
              }
            ]
          })(<Input placeholder="Name" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("description", {
            initialValue: item.description,
            rules: [
              {
                message: "Enter a description"
              },
              {
                required: true,
                message: "Enter a description"
              }
            ]
          })(<Input placeholder="Description" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("price", {
            initialValue: item.price,
            rules: [
              {
                message: "Enter a price"
              },
              {
                required: true,
                message: "Enter a price"
              }
            ]
          })(<Input placeholder="Price" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("stock", {
            initialValue: item.stock,
            rules: [
              {
                message: "Enter stock"
              }
            ]
          })(<Input placeholder="Stock" />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
        <div>
          <p onClick={toStore}>cancel</p>
        </div>
      </Form>
    </div>
  );
}

const UpdateItemForm = Form.create({ name: "createItem" })(UpdateItem);

export default UpdateItemForm;
