import { UPLOAD_LOGO } from '../actionTypes';

const initialState = {
  logo: '',
};

const logoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_LOGO:
      return {
        logo: action.payload,
      };
    default:
      return state;
  }
};

export default logoReducer;
