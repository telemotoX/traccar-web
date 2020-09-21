import React, {createRef} from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormGroup, CardBody
} from "reactstrap"
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik"
import {connect} from "react-redux"
import * as Icon from "react-feather"
import DataTable from "react-data-table-component"
import ModalFooter from "reactstrap/es/ModalFooter"
import { Map, TileLayer, FeatureGroup, Marker, Polygon, Polyline, Circle } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import L from 'leaflet'

import "leaflet-draw/dist/leaflet.draw.css"

import {addGeofence, editGeofence, deleteGeofence} from "../../redux/actions/geofence"

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});


const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true
  },
  {
    name: "Description",
    selector: "description",
    sortable: true
  },
]

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  description: Yup.string()
})

const addFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  description: Yup.string()
})

class GeoFenceModal extends React.Component {
  constructor(props) {
    super(props);

    this._editableFG = createRef()
  }
  state = {
    activeTab: "1",
    modal: this.props.show,
    add_modal: false,
    edit_modal: false,
    delete_modal: false,
    current_geofence: undefined,
    current_coordinates: undefined,
    current_geo_json: undefined,
    current_geo_type: '',
    current_geo_name: '',
    current_geo_description: '',
    current_geo_id: undefined,
    current_circle_radius: undefined
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
    this.props.onClose()
  }

  toggleAddModal = () => {
    this.setState(prevState => ({
      add_modal: !prevState.add_modal
    }))
  }

  toggleEditModal = () => {
    this.setState(prevState => ({
      edit_modal: !prevState.edit_modal
    }))
  }

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      delete_modal: !prevState.delete_modal
    }))
  }

  deleteGeofence = () => {
    this.setState(prevState => ({
      delete_modal: !prevState.delete_modal
    }))
    this.props.deleteGeofence(this.state.current_geo_id)
  }

  rowClicked = (row) => {
    const geofence = this.props.geofences.filter(geofence => {
      return geofence.id === row.id
    })
    this.setState({current_geofence: geofence[0]})

    if (geofence[0]['area'].includes("POLYGON")) {
      const geo_type = "POLYGON"
      const coordinate_string = geofence[0]['area'].split('((')[1].replace('))', '')
      const coordinates = coordinate_string.split(', ').map(coordinate => {
        const lat = parseFloat(coordinate.split(' ')[0])
        const long = parseFloat(coordinate.split(' ')[1])

        return [lat, long]
      })
      const center = L.polygon(coordinates).getBounds().getCenter()
      const label = L.divIcon({html: geofence[0]['name']})

      this.setState({
        current_geo_id: geofence[0]['id'],
        current_geo_name: geofence[0]['name'],
        current_geo_type: geo_type,
        current_coordinates: coordinates,
        center: center,
        label: label,
      })
    }
    else if (geofence[0]['area'].includes("LINESTRING")) {
      const geo_type = "LINESTRING"
      const coordinate_string = geofence[0]['area'].split(' (')[1].replace(')', '')
      const coordinates = coordinate_string.split(', ').map(coordinate => {
        const lat = parseFloat(coordinate.split(' ')[0])
        const long = parseFloat(coordinate.split(' ')[1])

        return [lat, long]
      })
      const center = L.polygon(coordinates).getBounds().getCenter()
      const label = L.divIcon({html: geofence[0]['name']})

      this.setState({
        current_geo_id: geofence[0]['id'],
        current_geo_name: geofence[0]['name'],
        current_geo_type: geo_type,
        current_coordinates: coordinates,
        center: center,
        label: label,
      })
    }
    else if (geofence[0]['area'].includes("CIRCLE")) {
      const geo_type = "CIRCLE"
      const coordinate_string = geofence[0]['area'].split(' (')[1].replace(')', '')
      const lat = parseFloat(coordinate_string.split(', ')[0].split(' ')[0])
      const long = parseFloat(coordinate_string.split(', ')[0].split(' ')[1])
      const coordinates = [lat, long]
      const radius = parseFloat(coordinate_string.split(', ')[1])
      const center = coordinates
      const label = L.divIcon({html: geofence[0]['name']})

      this.setState({
        current_geo_id: geofence[0]['id'],
        current_geo_name: geofence[0]['name'],
        current_geo_type: geo_type,
        current_coordinates: coordinates,
        current_circle_radius: radius,
        center: center,
        label: label,
      })
    }
  }

  _onDrawStart = (e) => {
    // here you have all the stored layers
    const drawnItems = this._editableFG.leafletElement._layers

    // if the number of layers is bigger than 1 then delete the first
    if (Object.keys(drawnItems).length > 0) {
      Object.keys(drawnItems).forEach((layerid, index) => {
        const layer = drawnItems[layerid]
        this._editableFG.leafletElement.removeLayer(layer)
      })
    }
  }

  _onEdited = (e) => {
    e.layers.eachLayer( (layer) => {
      const json_layer = layer.toGeoJSON()
      if (this.state.current_geo_type === "POLYGON") {
        const coords = json_layer['geometry']['coordinates'][0]
        this.setState({current_coordinates: coords.map(coord => {
            return [coord[1], coord[0]]
          })
        })
      }
      else if (this.state.current_geo_type === "LINESTRING") {
        const coords = json_layer['geometry']['coordinates']
        this.setState({current_coordinates: coords.map(coord => {
            return [coord[1], coord[0]]
          })
        })
      }
      else if (this.state.current_geo_type === "CIRCLE") {
        let centerPt = layer.getLatLng()
        let center = [centerPt.lat, centerPt.lng]

        let theRadius = layer.getRadius();

        this.setState({
          current_geo_type:"CIRCLE",
          current_coordinates: center,
          current_circle_radius: theRadius
        })
      }

    })

    this._onChange()
  }

  _onCreated = (e) => {
    let type = e.layerType
    if (type === 'marker') {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    }
    else {
      if (type === "polygon") {
        const json_layer = e.layer.toGeoJSON()
        const coords = json_layer['geometry']['coordinates'][0]

        this.setState({
          current_geo_type: 'POLYGON',
          current_coordinates: coords
        })
      }
      else if (type === 'polyline') {
        const json_layer = e.layer.toGeoJSON()
        const coords = json_layer['geometry']['coordinates']

        this.setState({
          current_geo_type: 'LINESTRING',
          current_coordinates: coords
        })
      }
      else if (type === 'circle') {
        let centerPt = e.layer.getLatLng()
        let center = [centerPt.lat, centerPt.lng]

        let theRadius = e.layer.getRadius();

        this.setState({
          current_geo_type:"CIRCLE",
          current_coordinates: center,
          current_circle_radius: theRadius
        })
      }

    }

    // Do whatever else you need to. (save to db; etc)
    this._onChange();
  }

  _onDeleted = (e) => {

    let numDeleted = 0;
    e.layers.eachLayer( (layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    this._onChange();
  }

  _onMounted = (drawControl) => {
    console.log('_onMounted', drawControl);
  }

  _onEditStart = (e) => {
    console.log('_onEditStart', e);
  }

  _onEditStop = (e) => {
    console.log('_onEditStop', e);
  }

  _onDeleteStart = (e) => {
    console.log('_onDeleteStart', e);
  }

  _onDeleteStop = (e) => {
    console.log('_onDeleteStop', e);
  }

  render() {
    const conditionalRowStyles = [
      {
        when: row => {
          if (this.state.current_geofence) {
            if (row.id === this.state.current_geofence.id)
              return true
            else
              return false
          } else {
            return false
          }
        },
        style: {
          backgroundColor: '#4d42c330',
          color: 'rgba(0,0,0,0.87)',
          '&:hover': {
            cursor: '',
          },
        },
      },
    ];

    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>
            Geofences
          </ModalHeader>
          <ModalBody>
            <CardBody style={{padding:"0"}}>
              <div className="d-flex flex-wrap justify-content-between">
                <div></div>
                <div className="add-new">
                  <Button.Ripple
                    color="flat-success"
                    onClick={this.toggleAddModal}
                    className="btn-sm text-success border-success"
                    style={{padding: "0.5rem 0.8rem", marginRight: "0.2rem"}}
                  >
                    <Icon.Plus size={14}/>
                  </Button.Ripple>
                  {this.state.current_geofence &&
                  <React.Fragment>
                    <Button.Ripple
                      color="flat-warning"
                      onClick={this.toggleEditModal}
                      className="btn-sm text-warning border-warning"
                      style={{padding: "0.5rem 0.8rem", marginRight: "0.2rem"}}
                    >
                      <Icon.Edit size={14}/>
                    </Button.Ripple>
                    <Button.Ripple
                      color="flat-danger"
                      onClick={this.toggleDeleteModal}
                      className="btn-sm text-danger border-danger"
                      style={{padding: "0.5rem 0.8rem", marginRight: "0.2rem"}}
                    >
                      <Icon.Delete size={14}/>
                    </Button.Ripple>
                  </React.Fragment>
                  }
                </div>
              </div>

              <DataTable
                data={this.props.geofences}
                columns={columns}
                noHeader
                onRowClicked={this.rowClicked}
                conditionalRowStyles={conditionalRowStyles}
              />

              {/* Add sub modal*/}
              <Modal
                isOpen={this.state.add_modal}
                toggle={this.toggleAddModal}
                className="modal-dialog-centered"
                size="lg"
              >
                <ModalHeader toggle={this.toggleAddModal}>
                  Add Geofence
                </ModalHeader>
                <ModalBody>
                  <Formik
                    initialValues={{
                      name: "",
                      identifier: ""
                    }}
                    validationSchema={addFormSchema}
                    onSubmit={values => {
                      this.setState(prevState => ({
                        add_modal: !prevState.add_modal
                      }))

                      let len = 0
                      let area = ''
                      switch (this.state.current_geo_type) {
                        case "LINESTRING":
                          len = this.state.current_coordinates.length
                          area = this.state.current_geo_type + " ("
                          for (let i=0; i<len-1; i++)
                            area += this.state.current_coordinates[i][1] + " " + this.state.current_coordinates[i][0] + ", "
                          area += this.state.current_coordinates[len-1][1] + " " + this.state.current_coordinates[len-1][0] + ")"
                          break
                        case "POLYGON":
                          len = this.state.current_coordinates.length
                          area = this.state.current_geo_type + "(("
                          for (let i=0; i<len-1; i++)
                            area += this.state.current_coordinates[i][1] + " " + this.state.current_coordinates[i][0] + ", "
                          area += this.state.current_coordinates[len-1][1] + " " + this.state.current_coordinates[len-1][0] + "))"
                          break
                        case "CIRCLE":
                          area = `${this.state.current_geo_type} (${this.state.current_coordinates[0]} ${this.state.current_coordinates[1]}, ${this.state.current_circle_radius})`
                          break
                      }

                      const geofence = {
                        id: -2,
                        name: values.name,
                        description: values.description,
                        calendarId: 0,
                        area: area
                      }
                      this.props.addGeofence(geofence)
                    }}
                  >
                    {({errors, touched}) => (
                      <Form>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Label for="name">Name</Label>
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            placeholder={"Name"}
                            className={`form-control ${errors.name && touched.name && "is-invalid"}`}
                          />
                          <ErrorMessage name="name">
                            {(msg /** this is the same as the above */) => (
                              <div className="field-error text-danger">{msg}</div>
                            )}
                          </ErrorMessage>
                        </FormGroup>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Label for="description">Description</Label>
                          <Field
                            type="text"
                            name="description"
                            id="description"
                            placeholder={"Description"}
                            className={`form-control ${errors.description && touched.description && "is-invalid"}`}
                          />
                          <ErrorMessage name="description">
                            {(msg /** this is the same as the above */) => (
                              <div className="field-error text-danger">{msg}</div>
                            )}
                          </ErrorMessage>
                        </FormGroup>
                        <FormGroup>
                          <Map center={[43.65282599631334, 123.82151998299355]} zoom={5} zoomControl={false} className="draw-mpabox">
                            <TileLayer
                              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                            <FeatureGroup ref={ featureGroupRef => {
                              this._onFeatureGroupReady(featureGroupRef)
                            }}>
                              <EditControl
                                position='topright'
                                onEdited={this._onEdited}
                                onCreated={this._onCreated}
                                onDeleted={this._onDeleted}
                                onMounted={this._onMounted}
                                onEditStart={this._onEditStart}
                                onEditStop={this._onEditStop}
                                onDeleteStart={this._onDeleteStart}
                                onDeleteStop={this._onDeleteStop}
                                onDrawStart={this._onDrawStart}
                                draw={{
                                  marker: false,
                                  circle: true,
                                  rectangle: false,
                                  polygon: true,
                                  polyline: true,
                                  circlemarker: false
                                }}
                              />
                            </FeatureGroup>
                          </Map>
                        </FormGroup>
                        <div className="justify-content-between" style={{float: "right"}}>
                          <Button.Ripple color="primary" type="submit">
                            Add
                          </Button.Ripple>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </ModalBody>
              </Modal>

              {/* Edit sub modal*/}
              <Modal
                isOpen={this.state.edit_modal}
                toggle={this.toggleEditModal}
                className="modal-dialog-centered"
                size="lg"
              >
                <ModalHeader toggle={this.toggleEditModal}>
                  Edit Geofence
                </ModalHeader>
                <ModalBody>
                  <Formik
                    initialValues={{
                      name: this.state.current_geofence ? this.state.current_geofence.name : "",
                      description: this.state.current_geofence ? this.state.current_geofence.description : ""
                    }}
                    validationSchema={formSchema}
                    onSubmit={values => {
                      this.setState(prevState => ({
                        edit_modal: !prevState.edit_modal,
                        current_geo_name: values.name,
                        current_geo_description: values.description,
                      }))

                      let len = 0
                      let area = ''
                      switch (this.state.current_geo_type) {
                        case "LINESTRING":
                          len = this.state.current_coordinates.length
                          area = this.state.current_geo_type + " ("
                          for (let i=0; i<len-1; i++)
                            area += this.state.current_coordinates[i][0] + " " + this.state.current_coordinates[i][1] + ", "
                          area += this.state.current_coordinates[len-1][0] + " " + this.state.current_coordinates[len-1][1] + ")"
                          break
                        case "POLYGON":
                          len = this.state.current_coordinates.length
                          area = this.state.current_geo_type + "(("
                          for (let i=0; i<len-1; i++)
                            area += this.state.current_coordinates[i][0] + " " + this.state.current_coordinates[i][1] + ", "
                          area += this.state.current_coordinates[len-1][0] + " " + this.state.current_coordinates[len-1][1] + "))"
                          break
                        case "CIRCLE":
                          area = `${this.state.current_geo_type} (${this.state.current_coordinates[0]} ${this.state.current_coordinates[0]}, ${this.state.current_circle_radius})`
                          break
                      }

                      const geofence = {
                        'id': this.state.current_geo_id,
                        'area': area,
                        'name': this.state.current_geo_name,
                        'description': this.state.current_geo_description,
                        'attributes': {},
                        'calendarId': 0,
                      }
                      this.props.editGeofence(geofence)
                    }}
                  >
                    {({errors, touched}) => (
                      <Form>
                        <FormGroup className="position-relative has-icon-left">
                          <Label for="name">Name</Label>
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            placeholder={"Name"}
                            className={`form-control ${errors.name && touched.name && "is-invalid"}`}
                          />
                          <ErrorMessage name="name">
                            {(msg /** this is the same as the above */) => (
                              <div className="field-error text-danger">{msg}</div>
                            )}
                          </ErrorMessage>
                        </FormGroup>
                        <FormGroup className="position-relative has-icon-left">
                          <Label for="description">Description</Label>
                          <Field
                            type="text"
                            name="description"
                            id="description"
                            placeholder={"Description"}
                            className={`form-control ${errors.description && touched.description && "is-invalid"}`}
                          />
                          <ErrorMessage name="description">
                            {(msg /** this is the same as the above */) => (
                              <div className="field-error text-danger">{msg}</div>
                            )}
                          </ErrorMessage>
                        </FormGroup>
                        <FormGroup>
                          <Map center={[43.65282599631334, 123.82151998299355]} zoom={5} zoomControl={false} className="draw-mpabox">
                            <TileLayer
                              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                            <FeatureGroup>
                              <EditControl
                                position='topright'
                                onEdited={this._onEdited}
                                onCreated={this._onCreated}
                                onDeleted={this._onDeleted}
                                onMounted={this._onMounted}
                                onEditStart={this._onEditStart}
                                onEditStop={this._onEditStop}
                                onDeleteStart={this._onDeleteStart}
                                onDeleteStop={this._onDeleteStop}
                                draw={{
                                  marker: false,
                                  circle: false,
                                  rectangle: false,
                                  polygon: false,
                                  polyline: false,
                                  circlemarker: false
                                }}
                              />

                              {
                                this.state.current_geo_type === "POLYGON" ?
                                  <Polygon positions={this.state.current_coordinates}>
                                    <Marker position={this.state.center} icon={this.state.label} />
                                  </Polygon>
                                  : this.state.current_geo_type === "LINESTRING" ?
                                  <Polyline positions={this.state.current_coordinates}>
                                    <Marker position={this.state.center} icon={this.state.label} />
                                  </Polyline>
                                  :
                                  <Circle center={this.state.current_coordinates} radius={this.state.current_circle_radius}>
                                    <Marker position={this.state.center} icon={this.state.label} />
                                  </Circle>
                              }
                            </FeatureGroup>
                          </Map>
                        </FormGroup>
                        <div className="justify-content-between" style={{float: "right"}}>
                          <Button.Ripple color="primary" type="submit">
                            Save
                          </Button.Ripple>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </ModalBody>
              </Modal>

              {/* Delete sub modal*/}
              {/* Remove modal */}
              <Modal
                isOpen={this.state.delete_modal}
                toggle={this.toggleDeleteModal}
                className="modal-dialog-centered modal-xs"
              >
                <ModalHeader toggle={this.toggleDeleteModal} className="bg-danger">
                  Delete Geofence
                </ModalHeader>
                <ModalBody className="modal-dialog-centered">
                  Do you really want to delete this geofence?
                </ModalBody>
                <ModalFooter>
                  <Button.Ripple color="danger" onClick={this.deleteGeofence}>
                    Delete
                  </Button.Ripple>
                </ModalFooter>
              </Modal>
            </CardBody>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }

  _onFeatureGroupReady = reactFGref => {
    // store the featureGroup ref for future access to content
    this._editableFG = reactFGref
  }

  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API
    const { onChange } = this.props;

    if (!this._editableFG || !onChange) {
      return;
    }

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    onChange(geojsonData);
  }
}

const mapStateToProps = state => {
  return {
    current_device: state.devices.current_device,
    geofences: state.geofences.geofences,
  }
}

export default connect(mapStateToProps, {addGeofence, editGeofence, deleteGeofence})(GeoFenceModal)
