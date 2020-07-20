const initialState = {
  events: [],
}

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_EVENT":
      return {
        ...state,
        events: action.payload
      }
    default:
      return state
  }
}

export default eventsReducer

