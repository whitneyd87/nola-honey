import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class CreateAccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
      reenterPassword: null,
      errorMessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.registerUser()
      .then((res) =>
        res.data.redirect === true
          ? this.props.history.push("/signin")
          : this.setState({ errorMessage: "Something went wrong" })
      )
      .catch((err) => console.error(err));
  }

  registerUser = async () => {
    try {
      const data = await axios.post("http://localhost:3001/createaccount", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <section className="form-section">
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form-label">
            Username
            <input
              onChange={(e) => this.handleChange(e)}
              type="text"
              name="username"
              className="form-input"
            ></input>
          </label>
          <label className="form-label">
            Email
            <input
              onChange={(e) => this.handleChange(e)}
              type="email"
              name="email"
              className="form-input"
            ></input>
          </label>
          <label className="form-label">
            Password
            <input
              onChange={(e) => this.handleChange(e)}
              type="password"
              name="password"
              className="form-input"
            ></input>
          </label>
          <label className="form-label">
            Re-enter Password
            <input
              onChange={(e) => this.handleChange(e)}
              type="password"
              name="reenterPassword"
              className="form-input"
            ></input>
          </label>
          <button
            type="submit"
            onClick={(e) => this.handleSubmit(e)}
            className="form-btn"
          >
            Create Account
          </button>
        </form>
      </section>
    );
  }
}

export default CreateAccountView;
