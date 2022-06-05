const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  data: [],
  pageInfo: {},
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_MOVIE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "GET_DATA_MOVIE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case "GET_DATA_MOVIE_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
        data: [],
        pageInfo: {},
      };
    }
    case "POST_MOVIE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "POST_MOVIE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "POST_MOVIE_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default movie;
