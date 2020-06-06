import * as types from './actionTypes';
import AxiosAuth from '../components/Auth/axiosWithAuth';
import axios from 'axios';

const getUserUrl =
  'https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/';

export const updateForm = (details) => ({
  type: types.UPDATE_FORM,
  payload: details,
});

export const getCurrentUser = () => (dispatch) => {
  AxiosAuth()
    .get(getUserUrl)
    .then((res) => {
      console.log('first res', res);
      dispatch({ type: types.GET_CURRENT_USER, payload: res.data });
      AxiosAuth()
        .get(
          `https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com
/api/store/${res.data._id}/products`
        )
        .then((res) => {
          const getAllCategories = res.data.map((cv) => {
            return cv.category;
          });
          const allUniqueCategories = [...new Set(getAllCategories)];
          const inventory = { ...res.data, allUniqueCategories };
          dispatch({ type: types.GET_INVENTORY, payload: inventory });
        });
    })
    .catch((error) => {
      setErrors(error.response.data);
    });
};

export const getCart = (cartId) => (dispatch) => {
  axios
    .get(
      `https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/cart/${cartId}`
    )
    .then((res) => {
      const savedCart = res.data;
      dispatch({ type: types.SAVE_CART, payload: savedCart });
    })
    .catch((error) => {
      console.log(error);
    });
};

export function increment(id) {
  return {
    type: types.INCREMENT,
    payload: id,
  };
}

export function decrement(id) {
  return {
    type: types.DECREMENT,
    payload: id,
  };
}

export const logout = () => {
  return {
    type: types.LOGOUT_USER,
  };
};

export const setStore = (store) => {
  return {
    type: types.SET_STORE,
    payload: store,
  };
};

export const setString = (str) => {
  return {
    type: types.SEARCHSTRING,
    payload: str,
  };
};

export const addToCart = (item) => {
  return {
    type: types.ADD_TO_CART,
    payload: item,
  };
};

export const updateCartQuantity = (id) => {
  return {
    type: types.UPDATE_CART_QUANTITY,
    payload: id,
  };
};

export const subtractFromCart = (item) => {
  return {
    type: types.REMOVE_ITEM_FROM_CART,
    payload: item,
  };
};

export const clearStore = () => {
  return {
    type: types.CLEAR_STORE,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: types.LOADING,
    payload: isLoading,
  };
};

export const setErrors = (errors) => {
  return {
    type: types.SET_ERRORS,
    payload: errors,
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};

export const clearUser = () => {
  return {
    type: types.CLEAR_USER,
  };
};

export const deleteStore = () => (dispatch) => {
  AxiosAuth()
    .delete('https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store')
    .then((res) => {
      const message = res.data;
      setLoading(true);
      clearStore();
      dispatch({ type: types.DELETE_STORE, payload: message });
    })
    .catch((err) => {
      setErrors(err.response.data);
    });
};

export const deleteAccount = () => (dispatch) => {
  setLoading(true);
  AxiosAuth()
    .delete(
      'https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/auth/account'
    )
    .then((res) => {
      logout();
      dispatch({ type: types.DELETE_ACCOUNT });
    })
    .catch((err) => {
      setErrors(err.response.data);
    });
};

export const getProducts = (sellerId, signal) => (dispatch) => {
  axios
    .get(
      `https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com
/api/store/${sellerId}/products`
    )
    .then((res) => {
      const inventory = res.data;
      dispatch({ type: types.GET_INVENTORY, payload: inventory });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStore = (sellerId, signal) => (dispatch) => {
  axios
    .get(
      `https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com
/api/store/${sellerId}`
    )
    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.GET_CURRENT_USER, payload: res.data });
    })
    .catch((error) => {
      setErrors(error.response.data);
    });
};

export const setStoreUrl = () => {
  return {
    type: types.SET_STORE_URL,
    payload: window.location.pathname,
  };
};

export const saveCart = (cart) => {
  return {
    type: types.SAVE_CART,
    payload: cart,
  };
};

export const getSalesHistory = () => (dispatch) => {
  setLoading(true);
  AxiosAuth()
    .get('https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/sales')
    .then((res) => {
      setLoading(false);
      dispatch({ type: types.GET_SALES_HISTORY, payload: res.data });
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
};

export const getOrders = () => {
  AxiosAuth()
    .get(
      'https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/orders'
    )
    .then((res) => {
      return (dispatch) => {
        dispatch({ type: types.GET_ORDERS, payload: res.data });
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

// onboarding actions

export const postOnboard = (values) => (dispatch) => {
  dispatch({ type: types.ADD_ONBOARDING, payload: values });
  // posting to backend from 'Welcome Screen' - 'create new store'

  // Getting rid of the post request for now due to backend issues
  
  // AxiosAuth()
  //   .post(
  //     'https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store',
  //     values
  //   )
  //   .then((res) => {
  //     console.log('did this post?', res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
// put all seller data to backend
export const profileUpdate = (userInfo) => (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE, payload: userInfo });
  AxiosAuth()
    .post(
      'https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/',
      userInfo
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logoUpload = (logo) => (dispatch) => {
  dispatch({ type: types.UPLOAD_LOGO, payload: logo });
  // logo put here

  AxiosAuth()
    .put('https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store', logo)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const colorUpload = (color) => (dispatch) => {
  dispatch({ type: types.UPLOAD_COLOR, payload: color });
  // color put here
  console.log('color', color);

  AxiosAuth()
    .put(
      'https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/',
      color
    )
    .then((res) => {
      console.log(res);
    })
    .catch(({ message, stack, code, error }) => {
      console.log(message, stack, code, error);
    });
};

export const deleteSellerInfo = (values) => (dispatch) => {
  dispatch({ type: types.DELETE_SELLER_INFO });
  // store delete here
  AxiosAuth()
    .delete(
      'https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/',
      values
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// end onboarding actions
