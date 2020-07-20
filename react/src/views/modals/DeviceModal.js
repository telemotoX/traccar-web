import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Card,
  CardBody
} from "reactstrap"
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {connect} from "react-redux";
import {addDevice, editDevice, deleteDevice} from "../../redux/actions/device";
import * as Icon from "react-feather"


const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  identifier: Yup.string()
    .required("Required")
})

class DeviceModal extends React.Component {
  state = {
    activeTab: "1",
    add_modal: false,
    edit_modal: false,
    delete_modal: false,
    command_modal: false
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

  toggleRemoveModal = () => {
    this.setState(prevState => ({
      delete_modal: !prevState.delete_modal
    }))
  }

  toggleCommandModal = () => {
    this.setState(prevState => ({
      command_modal: !prevState.command_modal
    }))
  }

  deleteDevice = () => {
    this.setState(prevState => ({
      delete_modal: !prevState.delete_modal
    }))
    this.props.deleteDevice(this.props.current_device)
  }

  render() {
    return (
      <React.Fragment>
        <Card style={{marginBottom: "0"}}>
          <CardBody style={{padding: "0"}}>
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
                {this.props.current_device &&
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
                    onClick={this.toggleRemoveModal}
                    className="btn-sm text-danger border-danger"
                    style={{padding: "0.5rem 0.8rem", marginRight: "0.2rem"}}
                  >
                    <Icon.Delete size={14}/>
                  </Button.Ripple>
                  <Button.Ripple
                    color="flat-info"
                    onClick={this.toggleCommandModal}
                    className="btn-sm text-info border-info"
                    style={{padding: "0.5rem 0.8rem", marginRight: "0.2rem"}}
                  >
                    <Icon.Command size={14}/>
                  </Button.Ripple>
                  <Button.Ripple
                    color="flat-primary"
                    onClick={this.toggleModal}
                    className="btn-sm text-primary border-primary"
                    style={{padding: "0.5rem 0.8rem", marginRight: "0.2rem"}}
                  >
                    <Icon.Settings size={14}/>
                  </Button.Ripple>
                </React.Fragment>
                }
              </div>
            </div>

            {/* Add modal */}
            <Modal
              isOpen={this.state.add_modal}
              toggle={this.toggleAddModal}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={this.toggleAddModal}>
                Add Device
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={{
                    name: "",
                    identifier: ""
                  }}
                  validationSchema={formSchema}
                  onSubmit={values => {
                    this.setState(prevState => ({
                      add_modal: !prevState.add_modal
                    }))

                    this.props.addDevice(values)
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
                        <Label for="identifier">Identifier</Label>
                        <Field
                          type="number"
                          name="identifier"
                          id="identifier"
                          placeholder={"Identifier"}
                          className={`form-control ${errors.identifier && touched.identifier && "is-invalid"}`}
                        />
                        <ErrorMessage name="identifier">
                          {(msg /** this is the same as the above */) => (
                            <div className="field-error text-danger">{msg}</div>
                          )}
                        </ErrorMessage>
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

            {/* Edit modal */}
            <Modal
              isOpen={this.state.edit_modal}
              toggle={this.toggleEditModal}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={this.toggleEditModal}>
                Edit Device
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={{
                    name:"",
                    identifier: ""
                  }}
                  validationSchema={formSchema}
                  onSubmit={values => {
                    this.setState(prevState => ({
                      edit_modal: !prevState.edit_modal
                    }))

                    this.props.editDevice(values)
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
                          value={this.props.current_device.name}
                          className={`form-control ${errors.name && touched.name && "is-invalid"}`}
                        />
                        <ErrorMessage name="name">
                          {(msg /** this is the same as the above */) => (
                            <div className="field-error text-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Label for="identifier">Identifier</Label>
                        <Field
                          type="number"
                          name="identifier"
                          id="identifier"
                          placeholder={"Identifier"}
                          value={this.props.current_device.uniqueId}
                          className={`form-control ${errors.identifier && touched.identifier && "is-invalid"}`}
                        />
                        <ErrorMessage name="identifier">
                          {(msg /** this is the same as the above */) => (
                            <div className="field-error text-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </FormGroup>
                      <div className="justify-content-between" style={{float: "right"}}>
                        <Button.Ripple color="primary" type="submit">
                          Edit
                        </Button.Ripple>
                      </div>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </Modal>

            {/* Remove modal */}
            <Modal
              isOpen={this.state.delete_modal}
              toggle={this.toggleRemoveModal}
              className="modal-dialog-centered modal-xs"
            >
              <ModalHeader toggle={this.toggleRemoveModal} className="bg-danger">
                Remove Device
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                Do you really want to delete this device?
              </ModalBody>
              <ModalFooter>
                <Button.Ripple color="danger" onClick={this.deleteDevice}>
                  Remove
                </Button.Ripple>
              </ModalFooter>
            </Modal>

            {/* Command modal */}
            <Modal
              isOpen={this.state.command_modal}
              toggle={this.toggleCommandModal}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={this.toggleCommandModal}>
                Command
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={{
                    name:"",
                    identifier: ""
                  }}
                  validationSchema={formSchema}
                  onSubmit={values => {
                    this.setState(prevState => ({
                      command_modal: !prevState.command_modal
                    }))

                    this.props.editDevice(values)
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
                          value={this.props.current_device.name}
                          className={`form-control ${errors.name && touched.name && "is-invalid"}`}
                        />
                        <ErrorMessage name="name">
                          {(msg /** this is the same as the above */) => (
                            <div className="field-error text-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Label for="identifier">Identifier</Label>
                        <Field
                          type="number"
                          name="identifier"
                          id="identifier"
                          placeholder={"Identifier"}
                          value={this.props.current_device.uniqueId}
                          className={`form-control ${errors.identifier && touched.identifier && "is-invalid"}`}
                        />
                        <ErrorMessage name="identifier">
                          {(msg /** this is the same as the above */) => (
                            <div className="field-error text-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </FormGroup>
                      <div className="justify-content-between" style={{float: "right"}}>
                        <Button.Ripple color="primary" type="submit">
                          Edit
                        </Button.Ripple>
                      </div>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </Modal>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    current_device: state.devices.current_device
  }
}

export default connect(mapStateToProps, {addDevice, editDevice, deleteDevice})(DeviceModal)
