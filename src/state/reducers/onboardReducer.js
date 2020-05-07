import { ADD_ONBOARDING } from '../../state/actionTypes';
const initialState = {
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
      };
    default:
      return state;
  }
};

export default onboardReducer;
