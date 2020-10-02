import axios from "axios"
import {API_URL} from "../../../configs/constant";
import { history } from "../../../history"


export const addGeofence = (geofence) => {
  return dispatch => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }

    axios
      .post(API_URL + "/api/geofences", geofence, config)
      .then(response => {
        dispatch({type: "ADD_GEOFENCE", payload: response.data})
      })
      .catch(err => {
        dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
        history.push("/login")
      })
  }
}

export const editGeofence = (geofence) => {
  return dispatch => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }

    axios
      .put(API_URL + "/api/geofences/"+geofence.id, geofence, config)
      .then(response => {
        dispatch({type: "UPDATE_GEOFENCE", payload: response.data})
      })
      .catch(err => {
        dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
        history.push("/login")
      })
  }
}

export const setCurrentGeofence = (value) => {
  return dispatch => {
    dispatch({type: "SET_CURRENT_geofence", payload: value})
  }
}

export const deleteGeofence = (id) => {
  return dispatch => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }

    axios
      .delete(API_URL + "/api/geofences/" + id, config)
      .then(response => {
        dispatch({type: "DELETE_GEOFENCE", id})
      })
      .catch(err => {
        dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
        history.push("/login")
      })
  }
}

export const toggleVisible = () => {
  return dispatch => {
    dispatch({type: "TOGGLE_VISIBLE"})
  }
}
