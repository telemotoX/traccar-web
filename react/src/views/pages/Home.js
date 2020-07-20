import React from "react"
import { history } from "../../history"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import ToastBasic from "../../components/@vuexy/toast/ToastBasic";
import {connect} from "react-redux";
import {init} from "../../redux/actions/initActions"

import "../../assets/scss/plugins/extensions/maps.scss"

const MyPopupMarker = ({ position, content }) => (
  <Marker position={position}>
    <Popup>{content}</Popup>
  </Marker>
)

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <React.Fragment>{items}</React.Fragment>
}

class Home extends React.Component{
  state = {
    markers: [
      { key: "marker1", position: [51.52, -0.1], content: "My first popup" },
      { key: "marker2", position: [51.51, -0.1], content: "My second popup" },
      { key: "marker3", position: [51.49, -0.1], content: "My third popup" }
    ]
  }

  UNSAFE_componentWillMount() {
    if(!this.props.auth.isAuthUser) {
      history.push("/login")
    } else {
      this.props.init()
    }
  }

  render() {
    return (
      <div>
        <ToastBasic/>
        <Map center={[51.505, -0.09]} zoom={13}>
          <TileLayer
            attribution='&ampcopy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMarkersList markers={this.state.markers} />
        </Map>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.login
  }
}

export default connect(mapStateToProps, {init})(Home)
