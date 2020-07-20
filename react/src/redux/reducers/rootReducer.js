import { combineReducers } from "redux"
import customizer from "./customizer/"
import auth from "./auth/"
import toast from "./toast/index"
import devices from "./device/index"
import events from "./device/index"
import positions from "./position/index"
import navbar from "./navbar/Index"

const rootReducer = combineReducers({
  customizer,
  auth,
  navbar,
  toast,
  devices,
  events,
  positions
})

export default rootReducer
