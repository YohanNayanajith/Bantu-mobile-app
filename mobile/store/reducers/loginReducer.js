const initialState = {
  authToken: null,
  userID:null,
  // userData: {},
  // anyData:[],
};

export default loginReducer = (state = initialState, action) => {
  // alert("Man Ava");
  switch (action.type) {
    case "LOGIN":
      return {
        ...state, //copy all previous states
        authToken: action.payload,
        userID:action.userID,
        userType:action.userType,
      };
    case "LOGOUT":
      return {
        authToken: null,
        userID: null,
      };
    default:
      return state;
  }
};
