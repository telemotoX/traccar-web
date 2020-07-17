import { history } from "../../history"
import {API_URL, SOCKET_URL, RECONNECT_TIMEOUT} from "../../configs/constant";
import axios from "axios"


export const init = () => {
  return dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios
      .get(API_URL + "/api/server", config)
      .then(response => {
        console.log("GET server => ", response)

        getGroups(dispatch)
        getDrivers(dispatch)
        getGeofences(dispatch)
        getCalendars(dispatch)
        getMaintenance(dispatch)
        getComputed(dispatch)
        getTypes(dispatch)
        getCommands(dispatch)
        getNotificationTypes(dispatch)
        getNotificators(dispatch)
        getNotifications(dispatch)
        getDevices(dispatch)
        getPositions(dispatch)
      })
      .catch(err => {
        dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
        history.push("/login")
      })
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}

const getGroups = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/groups", config)
    .then(response => {
      console.log("GET groups => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getDrivers = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/drivers", config)
    .then(response => {
      console.log("GET drivers => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getGeofences = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/geofences", config)
    .then(response => {
      console.log("GET geofences => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getCalendars = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/calendars", config)
    .then(response => {
      console.log("GET calendars => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getMaintenance = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/maintenance", config)
    .then(response => {
      console.log("GET maintenance => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getComputed = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/attributes/computed", config)
    .then(response => {
      console.log("GET computed => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getTypes = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/commands/types", config)
    .then(response => {
      console.log("GET types => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getCommands = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/commands", config)
    .then(response => {
      console.log("GET commands => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getNotificationTypes = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/notifications/types", config)
    .then(response => {
      console.log("GET notification types => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getNotificators = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/notifications/notificators", config)
    .then(response => {
      console.log("GET notificators => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getNotifications = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/notifications", config)
    .then(response => {
      console.log("GET notifications => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getDevices = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/devices", config)
    .then(response => {
      console.log("GET devices => ", response)
      asyncUpdate(true, dispatch)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const getPositions = (dispatch) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }
  axios
    .get(API_URL + "/api/positions", config)
    .then(response => {
      console.log("GET positions => ", response)
    })
    .catch(err => {
      dispatch({type: "LOGOUT_WITH_JWT", payload: {}})
      history.push("/login")
    })
}

const asyncUpdate = (first, dispatch) => {
  let protocol, pathname, socket
  protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  // pathname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

  const user = JSON.parse(localStorage.getItem("user"))
  const socketUrl = protocol + '//' + SOCKET_URL +
    '/api/socket?user_id=' + user.id +
    '&token=' + localStorage.getItem("token")

  socket = new WebSocket(socketUrl)


  socket.onclose = function () {
    // dispatch({type: "SHOW_TOAST", err})

    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }
    axios
      .get(API_URL + "/api/devices", config)
      .then(response => {
        console.log("Socket get devices => ", response)
        updateDevices(response.responseText)
      })
      .catch(err => {
        if (err.status === 401) {
          window.location.reload();
        }
      })

    axios
      .get(API_URL + "/api/positions", config)
      .then(response => {
        console.log("Socket get positions => ", response)
        updatePositions(response.responseText)
      })
      .catch(err => {
        if (err.status === 401) {
          window.location.reload();
        }
      })

    setTimeout(function () {
      asyncUpdate(false)
    }, RECONNECT_TIMEOUT)
  }

  socket.onmessage = function (event) {
    console.log("event.data", event.data)
    // var data = Ext.decode(event.data);
    const data = event.data

    if(data.devices) {
      updateDevices(data.devices)
    }
    if(data.positions) {
      updatePositions(data.positions, first)
      first = false
    }
    if(data.events) {
      updateEvents(data.events)
    }
  }
}

const updateEvents = (array) => {
  // var i, store, device;
  // store = Ext.getStore('Events');
  // for (i = 0; i < array.length; i++) {
  //   store.add(array[i]);
  //   device = Ext.getStore('Devices').getById(array[i].deviceId);
  //   if (device) {
  //     if (this.soundPressed()) {
  //       this.beep();
  //     }
  //     Traccar.app.showToast(array[i].text, device.get('name'));
  //   } else {
  //     Traccar.app.showToast(array[i].text);
  //   }
  // }
}

const updateDevices = (array) => {
  // var i, store, entity;
  // store = Ext.getStore('Devices');
  // for (i = 0; i < array.length; i++) {
  //   entity = store.getById(array[i].id);
  //   if (entity) {
  //     entity.set({
  //       status: array[i].status,
  //       lastUpdate: array[i].lastUpdate,
  //       geofenceIds: array[i].geofenceIds
  //     }, {
  //       dirty: false
  //     });
  //   }
  // }
}

const updatePositions = (array, first) => {
  // var i, store, entity, deviceId, device;
  // store = Ext.getStore('LatestPositions');
  // for (i = 0; i < array.length; i++) {
  //   entity = store.findRecord('deviceId', array[i].deviceId, 0, false, false, true);
  //   if (entity) {
  //     entity.set(array[i]);
  //   } else {
  //     store.add(Ext.create('Traccar.model.Position', array[i]));
  //   }
  //   if (Ext.getStore('Events').findRecord('positionId', array[i].id, 0, false, false, true)) {
  //     Ext.getStore('EventPositions').add(Ext.create('Traccar.model.Position', array[i]));
  //   }
  // }
  // if (first) {
  //   deviceId = Ext.Object.fromQueryString(window.location.search).deviceId;
  //   if (deviceId) {
  //     device = Ext.getStore('VisibleDevices').findRecord('id', deviceId, 0, false, true, true);
  //     if (device) {
  //       this.fireEvent('selectdevice', device, true);
  //     }
  //   }
  //   if (!device) {
  //     this.zoomToAllDevices();
  //   }
  // }
}
