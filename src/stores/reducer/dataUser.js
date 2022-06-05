const initialState = {
  user: {},
};

const getDataUser = (state = initialState, action) => {
  switch (action.type) {
    case "GETDATA_PENDING": {
      console.log(action, "reduce data user");
      return {
        ...state,
      };
    }
    case "GETDATA_FULFILLED": {
      console.log(action, "reduce data user");
      return {
        ...state,
        user: action.payload.data.data[0],
      };
    }
    case "GETDATA_REJECTED": {
      console.log(action, "reduce data user");
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default getDataUser;
