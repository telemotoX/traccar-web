export const login = (
  state = {
    userRole: "admin",
    isAuthUser: !!localStorage.getItem('user'),
    user: JSON.parse(localStorage.getItem("user")) || {}
  },
  action) => {
  switch (action.type) {
    case "LOGIN_WITH_JWT": {
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", action.payload.user.token)
      return { ...state, isAuthUser: true, user: action.payload.user }
    }
    case "LOGOUT_WITH_JWT": {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      return { ...state, user: null, isAuthUser: false }
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole }
    }
    default: {
      return state
    }
  }
}
