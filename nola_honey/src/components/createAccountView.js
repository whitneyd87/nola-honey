import React from "react";

class SignUpView extends React.Component {
  render() {
    return (
      <section className="form-section">
        <form action="" method="" className="form">
          <label className="form-label">
            Email
            <input type="email" name="email" className="form-input"></input>
          </label>
          <label className="form-label">
            Password
            <input type="password" name="enter" className="form-input"></input>
          </label>
          <label className="form-label">
            Re-enter Password
            <input
              type="password"
              name="re-enter"
              className="form-input"
            ></input>
          </label>
          <input
            type="submit"
            value="create account"
            className="form-btn"
          ></input>
        </form>
      </section>
    );
  }
}

export default SignUpView;
