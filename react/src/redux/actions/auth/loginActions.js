import { history } from "../../../history"
import {API_URL} from "../../../configs/constant";
import axios from "axios"


export const loginWithJWT = user => {
  return dispatch => {
    const qs = require('querystring')
    const requestBody = {
      email: user.email,
      password: user.password
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios
      .post(API_URL + "/api/session", qs.stringify(requestBody), config)
      .then(response => {
        var user

        if (response.data) {
          user = response.data

          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { user }
          })

          history.push("/")
        }
      })
      .catch(err => {
        console.log(err)
        alert("That username or email already exists. Please check again")
      })
  }
}

export const logoutWithJWT = () => {
  return dispatch => {
    dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
    history.push("/login")
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
