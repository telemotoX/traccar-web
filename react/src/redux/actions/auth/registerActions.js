import { history } from "../../../history"
import {API_URL} from "../../../configs/constant";
import "firebase/auth"
import "firebase/database"
import axios from "axios"

export const signupWithJWT = (email, password, name) => {
  console.log(name)
  console.log(email)
  console.log(password)
  return dispatch => {
    axios
      .post(API_URL + "/api/users", {
        email: email,
        password: password,
        name: name
      })
      .then(response => {
        var loggedInUser

        if(response.data){
          loggedInUser = response.data

          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" }
          })

          history.push("/")
        }

      })
      .catch(err => {
        alert("That username or email already exists. Please check again")
      })
  }
}
