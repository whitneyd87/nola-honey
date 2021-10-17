import React from "react";
import axios from "axios";

class SignInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
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

  handleSubmit(e) {
    e.preventDefault();
    this.userSignIn()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    this.setState({ formSubmitted: true });
  }

  userSignIn = async () => {
    try {
      const data = await axios.post(
        "http://localhost:3001/signin",
        {
          username: this.state.username,
          password: this.state.password,
        },
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <section className="form-section">
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <label className="form-label">
            Username
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => this.handleChange(e)}
              className="form-input"
            ></input>
          </label>
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
              id="password"
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

export default SignInView;
