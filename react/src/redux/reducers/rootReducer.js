import { combineReducers } from "redux"
import customizer from "./customizer/"
import auth from "./auth/"
import toast from "./toast/index"
import devices from "./device/index"
import navbar from "./navbar/Index"

const rootReducer = combineReducers({
  customizer,
  auth,
  navbar,
  toast,
  devices
})

export default rootReducer
