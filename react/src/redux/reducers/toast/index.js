const initialState = {
  err_show: false,
  err_msg: ""
}

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_TOAST_STATE":
      return {
        ...state,
        err_show: !action.err_show
      }
    case "SHOW_TOAST":
      return {
        ...state,
        err_show: true,
        err_msg: action.err_msg
      }
    default:
      return state
  }
}

export default toastReducer

