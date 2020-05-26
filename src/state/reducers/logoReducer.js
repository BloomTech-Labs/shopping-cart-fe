const initialState = {
  logo: 'https://i.gyazo.com/c07509b1684992e37e46b355e942dadf.png',
};

const logoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_LOGO':
      return {
        logo: action.payload,
      };
    default:
      return state;
  }
};

export default logoReducer;
