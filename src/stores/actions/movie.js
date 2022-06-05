export const getDataMovie = (page, limit) => {
  return {
    type: "GET_DATA_MOVIE",
    // payload: axios.get(`movie?page=${page}&limit=${limit}`) // masukan parameter di dalam path
  };
};

export const postMovie = (data) => {
  return {
    type: "POST_MOVIE",
    // payload: axios.post("movie", data)
  };
};

export const updateMovie = (id, data) => {
  return {
    type: "UPDATE_MOVIE",
    // payload: axios.patch(`movie/${id}`, data)
  };
};

export const deleteMovie = (id) => {
  return {
    type: "DELETE_MOVIE",
    // payload: axios.delete(`movie/${id}`)
  };
};
