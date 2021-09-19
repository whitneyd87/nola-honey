import React from "react";

class LogInView extends React.Component {
  render() {
    return (
      <section className="form-section">
        <form className="form">
          <label className="form-label">
            Email
            <input type="email" name="email" className="form-input"></input>
          </label>
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
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
