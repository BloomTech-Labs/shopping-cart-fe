import {
  ADD_ONBOARDING,
  DELETE_SELLER_INFO,
  POST_ALL_SELLER_INFO,
  UPLOAD_COLOR,
  UPLOAD_LOGO

} from '../../state/actionTypes';
const initialState = {
  businessName: '',
  ownerName: '',
  address: '',
  secondAddress: '',
  city: '',
  state: '',
  zipcode: null,
  hours: '',
  curbHours: '',
  color: '',
  logo: '',
};

const onboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONBOARDING:
      return {
        businessName: action.payload.businessName,
        ownerName: action.payload.ownerName,
        address: action.payload.address,
        secondAddress: action.payload.secondAddress,
        city: action.payload.city,
        state: action.payload.state,
        zipcode: action.payload.zipcode,
        hours: action.payload.hours,
        curbHours: action.payload.curbHours,
        logo: '',
        color: '',
      };
    case DELETE_SELLER_INFO:
      return {
        businessName: '',
        ownerName: '',
        address: '',
        secondAddress: '',
        city: '',
        state: '',
        zipcode: '',
        hours: '',
        curbHours: '',
      };
    case POST_ALL_SELLER_INFO:
      return {
        businessName: action.payload.businessName,
        ownerName: action.payload.ownerName,
        address: action.payload.address,
        secondAddress: action.payload.secondAddress,
        city: action.payload.city,
        state: action.payload.state,
        zipcode: action.payload.zipcode,
        hours: action.payload.hours,
        curbHours: action.payload.curbHours,
        logo: action.payload.logo,
        color: action.payload.color,
      };
    case UPLOAD_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    case UPLOAD_LOGO:
      return {
        ...state,
        logo: action.payload,
      };
    default:
      return state;
  }
};

export default onboardReducer;
