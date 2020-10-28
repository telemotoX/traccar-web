import { history } from "../../../history"
import {API_URL} from "../../../configs/constant";
import axios from "axios"


export const addDevice = (value) => {
  return dispatch => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }

    const device = {
      category: null,
      contact: "",
      disabled: false,
      groupId: 0,
      id: -1,
      lastUpdate: null,
      model: "",
      name: value.name,
      phone: "",
      status: null,
      uniqueId: value.identifier
    }
    axios
      .post(API_URL + "/api/devices", device, config)
      .then(response => {
        dispatch({type: "ADD_DEVICE", payload: response.data})
      })
      .catch(err => {
        dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
        history.push("/login")
      })
  }
}

export const editDevice = (device) => {
  return dispatch => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }

    axios
      .put(API_URL + "/api/devices/"+device.id, device, config)
      .then(response => {
        console.log(response.data)
        dispatch({type: "EDIT_DEVICE", payload: response.data})
      })
      .catch(err => {
        dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
        history.push("/login")
      })
  }
}

export const setCurrentDevice = (value) => {
  return dispatch => {
    dispatch({type: "SET_CURRENT_DEVICE", payload: value})
  }
}

export const deleteDevice = (cur_device) => {
  return dispatch => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }


    axios
      .delete(API_URL + "/api/devices/" + cur_device.id, config)
      .then(response => {
        dispatch({type: "DELETE_DEVICE", device_id: cur_device.id})
      })
      .catch(err => {
        dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
        history.push("/login")
      })
  }
}
