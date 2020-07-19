import { history } from "../../../history"
import {API_URL} from "../../../configs/constant";
import "firebase/auth"
import "firebase/database"
import axios from "axios"

export const signupWithJWT = (email, password, name) => {
  return dispatch => {
    axios
      .post(API_URL + "/api/users", {
        email: email,
        password: password,
        name: name
      })
      .then(response => {
        var user
        console.log(response)
        if(response.data){
          user = response.data

          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { user }
          })

          history.push("/login")
        }

      })
      .catch(err => {
        alert("That username or email already exists. Please check again")
      })
  }
}
