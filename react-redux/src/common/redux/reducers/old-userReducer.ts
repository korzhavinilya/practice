const initialState = { name: 'Old reducer', age: 0 };

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CHANGEUSERNAME': {
      return { ...state, name: action.payload };
    }
    case 'CHANGEAGE': {
      return { ...state, age: action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
