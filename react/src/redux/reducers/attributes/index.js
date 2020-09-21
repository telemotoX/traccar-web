const initialState = {
  attributes: [],
  current_attribute: []
}

const attributesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ATTRIBUTES":
      return {
        ...state,
        attributes: action.payload
      }
    case "SET_CURRENT_ATTRIBUTE":
      return {
        ...state,
        current_attribute: action.payload
      }
    default:
      return state
  }
}

export default attributesReducer
