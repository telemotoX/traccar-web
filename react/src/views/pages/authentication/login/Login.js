import React from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label
} from "reactstrap"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { history } from "../../../../history"
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import "../../../../assets/scss/pages/authentication.scss"

const formSchema = Yup.object().shape({
  email: Yup.string()
    // .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .min(5, "Must be longer than 5 characters")
    .max(20, "Nice try, nobody has a last name that long")
    .required("Required")
})

class Login extends React.Component {
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="4"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
          style={{maxWidth:'400px'}}
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col lg="12" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                        remember: false
                      }}
                      validationSchema={formSchema}
                      onSubmit={values => {
                        this.props.loginWithJWT(values)
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <h4>Login</h4>
                          <br />
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Field
                              type="text"
                              name="email"
                              id="email"
                              placeholder={"Email"}
                              className={`form-control ${errors.email &&
                              touched.email &&
                              "is-invalid"}`}
                            />
                            <ErrorMessage name="email">
                              {(msg /** this is the same as the above */) => (
                                <div className="field-error text-danger">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormGroup>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Label for="email">Password</Label>
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              placeholder={"Password"}
                              className={`form-control ${errors.password &&
                              touched.password &&
                              "is-invalid"}`}
                            />
                            <ErrorMessage name="password">
                              {(msg /** this is the same as the above */) => (
                                <div className="field-error text-danger">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormGroup>
                          <FormGroup className="d-flex justify-content-end">
                            <a href="/forget">Forgot Password?</a>
                          </FormGroup>
                          <div className="d-flex justify-content-between">
                            <Button.Ripple
                              color="primary"
                              outline
                              onClick={() => {
                                history.push("/register")
                              }}
                            >
                              Signup
                            </Button.Ripple>
                            <Button.Ripple color="primary" type="submit">
                              Signin
                            </Button.Ripple>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}
export default connect(mapStateToProps, { loginWithJWT })(Login)
