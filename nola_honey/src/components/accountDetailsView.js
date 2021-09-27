import React from "react";
import axios from "axios";

class AccountDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      user: null,
    };
  }

  getUserDetails = async () => {
    try {
      const useID = this.state.userID;
      const data = await axios.get("");
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getUserDetails()
      .then((res) => this.setState({ user: res.data.user }))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <section>
        <h1>Hello</h1>
      </section>
    );
  }
}

export default AccountDetailsView;
