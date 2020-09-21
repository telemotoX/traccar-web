export const setCurrentAttribute = (value) => {
  return dispatch => {
    dispatch({type: "SET_CURRENT_ATTRIBUTE", payload: value})
  }
}
