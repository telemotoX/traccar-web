import { combineReducers } from "redux"
import customizer from "./customizer/"
import auth from "./auth/"
import toast from "./toast/index"
import devices from "./device/index"
import events from "./device/index"
import positions from "./position/index"
import attributes from "./attributes/index"
import navbar from "./navbar/Index"
import geofences from "./geofences/index"

const rootReducer = combineReducers({
  customizer,
  auth,
  navbar,
  toast,
  devices,
  events,
  positions,
  attributes,
  geofences,
})

export default rootReducer
