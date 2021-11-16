import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class SignOutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  signOut = async () => {
    try {
      const data = await axios.get(`http://localhost:3001/signout`, {
        withCredentials: true,
      });
      localStorage.setItem("signedIn", false);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.signOut()
      .then((res) => {
        this.setState({ redirect: res.data.redirect });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <section>
        {this.state.redirect && (
          <Redirect to={{ pathname: "/signin", state: { signedOut: true } }} />
        )}
      </section>
    );
  }
}

export default SignOutView;
