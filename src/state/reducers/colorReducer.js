const initialState = {
  color: '',
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_COLOR':
      return {
        color: action.payload,
      };
    default:
      return state;
  }
};

export default colorReducer;
