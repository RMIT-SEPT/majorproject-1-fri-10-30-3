import { GET_ERRORS } from "./types";

export const createAccount = (info, history) => async dispatch => {
  try {
    const res = await fetch.post("http://localhost:8080/api/person", person);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
