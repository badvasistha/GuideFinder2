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
    const data = {...this.props.coords, ...formProps}


    this.props.signup(data, () => {
      this.props.history.push("/profile");
    });
  };

  render() {

    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
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
          <fieldset>
            <Field
              name="activities"
              type="text"
              label="activities"
              component={this.renderInput}
              autoComplete="none"
            />
          </fieldset>
          <fieldset>
            <Field
              name="aboutMe"
              type="text"
              label="About me"
              component={this.renderInput}
              autoComplete="none"
            />
          </fieldset>
          <fieldset>
          <Field
            name="yearsOfExperience"
            type="text"
            label="Years of Experience"
            component={this.renderInput}
            autoComplete="none"
          />
        </fieldset>
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
