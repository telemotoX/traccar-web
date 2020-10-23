import React, {createRef} from "react"
import L from 'leaflet'
import {connect} from "react-redux"
import {Map, TileLayer, Marker, Popup, Polygon, Polyline, Circle, LayersControl } from "react-leaflet"
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'

import { history } from "../../history"
import ToastBasic from "../../components/@vuexy/toast/ToastBasic"
import {init} from "../../redux/actions/initActions"
import TailRoute from "../../components/traccar/TailRoute"

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
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true,
    }

    this.map = createRef()
  }

  UNSAFE_componentWillMount() {
    if(!this.props.auth.isAuthUser) {
      history.push("/login")
    } else {
      this.props.init()
    }
  }

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  render() {
    const {positions, geofences} = this.props
    console.log(geofences)

    return (
        <div>
          <ToastBasic/>

          <Map
            center={
              positions && positions.length > 0 ? [positions[0].latitude, positions[0].longitude] : [51.505, -0.09]
            }
            zoom={5}
            ref={this.saveMap}
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

            {
              this.props.isVisible && geofences.map(geofence => {
                const geoType = getGeofenceType(geofence.area)
                let coordinates, center, label;

                coordinates = getCoords(geofence.area, geoType)
                label = L.divIcon({html: geofence.name})

                switch (geoType) {
                  case 'POLYGON':
                    center = L.polygon(coordinates).getBounds().getCenter()
                    return (
                      <Polygon key={geofence.id} positions={coordinates}>
                        <Marker position={center} icon={label} />
                      </Polygon>
                    )
                  case 'LINESTRING':
                    center = L.polygon(coordinates).getBounds().getCenter()
                    return (
                      <Polyline key={geofence.id} positions={coordinates}>
                        <Marker position={center} icon={label} />
                      </Polyline>
                    )
                  case 'CIRCLE':
                    center = coordinates.coordinates
                    return (
                      <Circle key={geofence.id} center={coordinates.coordinates} radius={coordinates.radius}>
                        <Marker position={center} icon={label} />
                      </Circle>
                    )
                }
              })
            }

            {/*'roadmap' | 'satellite' | 'terrain' | 'hybrid'*/}
            {/*<ReactLeafletGoogleLayer googleMapsLoaderConf={{KEY: ''}} type={'roadmap'} />*/}

            {/*{this.state.isMapInit && <TailRoute map={this.map} />}*/}
          </Map>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.login,
    positions: state.positions.positions,
    geofences: state.geofences.geofences,
    isVisible: state.geofences.isVisible,
  }
}

const getGeofenceType = (area) => {
  if (area.includes("POLYGON"))
    return "POLYGON"
  else if (area.includes("LINESTRING"))
    return "LINESTRING"
  else if (area.includes("CIRCLE"))
    return "CIRCLE"
}

const getCoords = (area, type='POLYGON') => {
  let coordinate_string;

  switch (type) {
    case "POLYGON":
      coordinate_string = area.split('((')[1].replace('))', '')
      return coordinate_string.split(', ').map(coordinate => {
        const lat = parseFloat(coordinate.split(' ')[0])
        const long = parseFloat(coordinate.split(' ')[1])

        return [lat, long]
      })
    case "LINESTRING":
      coordinate_string = area.split(' (')[1].replace(')', '')
      return coordinate_string.split(', ').map(coordinate => {
        const lat = parseFloat(coordinate.split(' ')[0])
        const long = parseFloat(coordinate.split(' ')[1])

        return [lat, long]
      })
    case "CIRCLE":
      coordinate_string = area.split(' (')[1].replace(')', '')
      const lat = parseFloat(coordinate_string.split(', ')[0].split(' ')[0])
      const long = parseFloat(coordinate_string.split(', ')[0].split(' ')[1])
      const radius = parseFloat(coordinate_string.split(', ')[1])
      const coordinates = [lat, long]
      return {coordinates, radius}
  }
}

export default connect(mapStateToProps, {init})(Home)
