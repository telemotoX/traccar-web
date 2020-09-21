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

  UNSAFE_componentWillMount() {
    if(!this.props.auth.isAuthUser) {
      history.push("/login")
    } else {
      this.props.init()
    }
  }

  render() {
    const positions = this.props.positions
    return (
      <div>
        <ToastBasic/>
        <Map
          center={
            positions && positions.length > 0 ? [positions[0].latitude, positions[0].longitude] : [51.505, -0.09]
          }
          zoom={5}
        >
          <TileLayer
            attribution='&ampcopy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMarkersList markers={
            positions && positions.length > 0 ? positions.map(function(position){
              return {
                'key': position.deviceId,
                'position': [position.latitude, position.longitude],
                'content': "Position"
              }
            }) : [] }
          />
        </Map>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.login,
    positions: state.positions.positions
  }
}

export default connect(mapStateToProps, {init})(Home)
