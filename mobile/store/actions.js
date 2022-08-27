import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('token fetched');
      dispatch({
        type: 'LOGIN',
        payload: token,
      })
    }
  }
}

export const UserLogin = (data) => {
  return async dispatch => {
    // let token = null;
    // if (username === 'vishal' && password == '1234') {
    //   token = username + password;
    //   // here we can use login api to get token and then store it
      
    // }
    let token = data.token.toString();
    let userID = data.userID.toString();
    let userType = data.type.toString();
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userID', userID);
    await AsyncStorage.setItem('userType', userType);
    console.log('token stored');
    console.log('token ' + token);
    console.log('userType ' + userType);
    dispatch({
      type: 'LOGIN',
      payload: token,
      userID: userID,
      userType: userType,
    })
  }
}



export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT'
    })
  }
}