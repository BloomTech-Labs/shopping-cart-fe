// import { UPLOAD_LOGO } from '../actionTypes';

const initialState = {
  logo: 'orange',
};

const logoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_LOGO':
      console.log('what here?')
      return {
        
        logo: action.payload,
      };
    default:
      return state;
  }
};

export default logoReducer;
