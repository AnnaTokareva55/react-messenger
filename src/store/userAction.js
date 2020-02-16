import { createActions } from "redux-actions";
import { createAction } from "redux-api-middleware";

export const { userRequest, userSuccess, userFailure } = createActions({
  USER_REQUEST: () => ({}),
  USER_SUCCESS: data => data,
  USER_FAILURE: error => error
});

export const loadUser = () => {
  return async dispatch => {
    try {
      dispatch(userRequest);
      const result = await fetch("/api/user.json");
      dispatch(userSuccess(await result.json()));
    } catch {
      dispatch(userFailure(error));
    }
  };
};

/*
export const userRequest = "@@user/USER_REQUEST";
export const userSuccess = "@@user/USER_SUCCESS";
export const userFailure = "@@user/USER_FAILURE";

export const loadUser = () =>
  createAction({
    endpoint: "/api/user.json",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [userRequest, userSuccess, userFailure]
  });
  */

/*
export const { loadUser } = createActions({
  LOAD_USER: () => ({})
});
*/
