const initialState = {
  positions: [],
}

const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_POSITION":
      return {
        ...state,
        positions: action.payload
      }
    default:
      return state
  }
}

export default positionsReducer
