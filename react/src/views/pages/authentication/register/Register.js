import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup, Button
} from "reactstrap"
import "../../../../assets/scss/pages/authentication.scss"
import {history} from "../../../../history";
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import {connect} from "react-redux";
import {signupWithJWT} from "../../../../redux/actions/auth/registerActions";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be longer than 3 characters")
    .max(20, "Nice try, nobody has a last name that long")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .min(5, "Must be longer than 5 characters")
    .max(20, "Nice try, nobody has a last name that long")
    .required("Required"),
  confirm_password: Yup.string()
    .min(5, "Must be longer than 5 characters")
    .max(20, "Nice try, nobody has a last name that long")
    .required("Required")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

class Register extends React.Component {
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
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col lg="12" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2">
                  <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h4 className="mb-0">Create Account</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title mb-0">
                    Fill the below form to create a new account.
                  </p>
                  <CardBody className="pt-1 pb-50">
                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirm_password: "",
                        accept_terms: false
                      }}
                      validationSchema={formSchema}
                      onSubmit={values => {
                        this.props.signupWithJWT(values.email, values.password, values.name)
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <FormGroup className="form-label-group">
                            <Field
                              type="text"
                              name="name"
                              id="name"
                              placeholder={"Username"}
                              className={`form-control ${errors.name && touched.name && "is-invalid"}`}
                            />
                            <ErrorMessage name="name">
                              {(msg /** this is the same as the above */) => (
                                <div className="field-error text-danger">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormGroup>
                          <FormGroup className="form-label-group">
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              placeholder={"Email"}
                              className={`form-control ${errors.email && touched.email && "is-invalid"}`}
                            />
                            <ErrorMessage name="email">
                              {(msg /** this is the same as the above */) => (
                                <div className="field-error text-danger">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormGroup>
                          <FormGroup className="form-label-group">
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              placeholder={"Password"}
                              className={`form-control ${errors.password && touched.password && "is-invalid"}`}
                            />
                            <ErrorMessage name="password">
                              {(msg /** this is the same as the above */) => (
                                <div className="field-error text-danger">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormGroup>
                          <FormGroup className="form-label-group">
                            <Field
                              type="password"
                              name="confirm_password"
                              id="confirm_password"
                              placeholder={"Confirm Password"}
                              className={`form-control ${errors.confirm_password && touched.confirm_password && "is-invalid"}`}
                            />
                            <ErrorMessage name="confirm_password">
                              {(msg /** this is the same as the above */) => (
                                <div className="field-error text-danger">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormGroup>
                          <div className="d-flex justify-content-between">
                            <Button.Ripple
                              color="primary"
                              outline
                              onClick={() => {
                                history.push("/login")
                              }}
                            >
                              Signin
                            </Button.Ripple>
                            <Button.Ripple color="primary" type="submit">
                              Signup
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
// export default Register
const mapStateToProps = state => {
  return {
    values: state.auth.register
  }
}

export default connect(mapStateToProps, { signupWithJWT })(Register)
