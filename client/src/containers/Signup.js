import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signup } from "../actions";
import validator from "validator";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


class Signup extends Component {
  renderErrors = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, label, type, meta }) => {
    return (
      <div>
        <label>{label}</label>
        <input type={type} {...input} autoComplete="off" />
        {this.renderErrors(meta)}
      </div>
    );
  };

  onSubmit = formProps => {
    console.log(formProps);
    this.props.signup(formProps, () => {
      this.props.history.push("/counter");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className = 'container'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset className="scheduler-border">
          <Field
            name="email"
            type="text"
            label="Email"
            component={this.renderInput}
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <Field
            name="password"
            type="password"
            label="Password"
            component={this.renderInput}
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <Field
            name="photolink"
            type="text"
            label="Photo Link"
            component={this.renderInput}
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <Field
            name="age"
            type="text"
            label="Age"
            component={this.renderInput}
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <Field
            name="city"
            type="text"
            label="City"
            component={this.renderInput}
            autoComplete="none"
          />
        </fieldset>
        {/* <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form> */}
        <div className="form-group">
          <p className="text-center">
            By signing up you accept our <Link to="#">Terms Of Use</Link>
          </p>
        </div>
        <button>Signup</button>
      </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

const validate = formValues => {
  const errors = {};
  console.log("validator", formValues);

  if (!formValues.email) {
    errors.email = "You must enter an email";
  }

  if (formValues.email) {
    if (!validator.isEmail(formValues.email)) {
      errors.email = "You must enter a valid email address";
    }
  }

  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    { signup }
  ),
  reduxForm({
    form: "signup",
    validate
  })
)(Signup);
