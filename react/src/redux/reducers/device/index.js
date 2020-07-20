const initialState = {
  devices: [],
  current_device: null
}

const devicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DEVICE":
      return {
        ...state,
        devices: [...state.devices, action.payload],
        current_device: action.payload
      }
    case "GET_DEVICES":
      return {
        ...state,
        devices: action.payload,
        current_device: action.payload.length > 0 ? action.payload[0] : null
      }
    case "DELETE_DEVICE":
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.device_id),
        current_device: state.devices[0]
      }
    case "UPDATE_DEVICE":
      return {
        ...state,
        devices: action.payload
      }
    case "SET_CURRENT_DEVICE":
      return {
        ...state,
        current_device: action.payload
      }
    default:
      return state
  }
}

export default devicesReducer

