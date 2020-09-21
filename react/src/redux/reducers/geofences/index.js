const initialState = {
  geofences: [],
}

const geofencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_GEOFENCE":
      return {
        ...state,
        geofences: [...state.geofences, action.payload],
      }
    case "GET_GEOFENCES":
      return {
        ...state,
        geofences: action.payload,
      }
    case "DELETE_GEOFENCE":
      return {
        ...state,
        geofences: state.geofences.filter(geofence => geofence.id !== action.id),
      }
    case "UPDATE_GEOFENCE":
      return {
        ...state,
        geofences: state.geofences.map(geofence => {
          if (geofence.id === action.payload.id)
            return action.payload
          else
            return geofence
        })
      }
    default:
      return state
  }
}

export default geofencesReducer

