import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class DeleteCartItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: this.props.location.state.itemID,
      sessionID: localStorage.getItem("sessionID"),
      redirect: false,
    };
  }

  deleteCartItem = async () => {
    try {
      const id = this.state.itemID;
      const sessionID = this.state.sessionID;
      const data = await axios.delete(
        `http://localhost:3001/shop/${id}/${sessionID}/mycart`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.deleteCartItem()
      .then((res) => {
        console.log(res);
        this.setState({ redirect: true });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect)
      return (
        <Redirect
          to={{ pathname: "/shop/mycart", state: { redirect: true } }}
        />
      );

    return (
      <section>
        <h1>Item Deleted</h1>
      </section>
    );
  }
}

export default DeleteCartItemView;
