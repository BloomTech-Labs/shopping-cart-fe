const initialState = {
  color: '',
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_COLOR':
      return {
        color: action.payload,
      };
    case 'DELETE_SELLER_COLOR':
      return {
        color: '',
      };
    default:
      return state;
  }
};

export default colorReducer;
