const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  idUser: "",
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "LOGIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        idUser: action.payload.data.data.id,
        msg: action.payload.data.msg,
      };
    }
    case "LOGIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        idUser: "",
        msg: action.payload.response.data.msg,
      };
    }
    case "REGISTER_PENDING": {
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: "",
      };
    }
    case "REGISTER_FULFILLED": {
      return {
        ...state,
        isError: false,
        isLoading: false,
        message: action.payload.data.message,
      };
    }
    case "REGISTER_REJECTED": {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.response.data.message,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default Auth;
