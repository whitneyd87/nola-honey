import React from "react";
import axios from "axios";

class LogInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      formSubmitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    this.userLogin()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  userLogin = async () => {
    try {
      const data = await axios.post("http://localhost:3001/signin", {
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
        <form className="form" onSubmit={this.onSubmit}>
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              onChange={(e) => this.handleChange(e)}
              className="form-input"
            ></input>
          </label>
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
              onChange={(e) => this.handleChange(e)}
              className="form-input"
            ></input>
          </label>
          <input type="submit" value="sign in" className="form-btn"></input>
        </form>
      </section>
    );
  }
}

export default LogInView;
