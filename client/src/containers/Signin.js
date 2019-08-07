import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signin } from "../actions";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./style.css";

class Signin extends Component {
  onSubmit = formValues => {
    this.props.signin(formValues, () => {
      this.props.history.push("/profile");
    });
  };

  renderInput = ({ input, type }) => {
    return <input type={type} {...input} />;
  };

  render() {

    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset className="my-fieldset">
          <label>Email</label>
          <Field
            name="email"
            type="text"
            label="Email"
            component={this.renderInput}
            autoComplete="none"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            label="password"
            component={this.renderInput}
            autoComplete="none"
          />
        </fieldset>
        <button className="nav-link float-left naturalWHite"> <i className="fa fa-sign-in" aria-hidden="true" />
          Signin
          </button>
        <div>{this.props.errorMessage}</div>
        <br/>
        <div>
          <button>
            <Link className="nav-link float-left naturalWHite" to="/guideloc">
              <i className="fa fa-paper-plane" aria-hidden="true" />
              Sign Up
            </Link>
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    { signin }
  ),
  reduxForm({ form: "signin" })
)(Signin);
