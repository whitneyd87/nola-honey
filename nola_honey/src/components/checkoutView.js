import React from "react";
import axios from "axios";
import { GenerateCartPreview } from "./helpers/itemHelper";

function GenerateAddresses(props) {}

function GenerateAddressForm(props) {}

class CheckoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      sessionID: localStorage.getItem("sessionID"),
    };
  }

  getCartData = async () => {
    try {
      const sessionID = this.state.sessionID;
      const data = await axios.get(
        `http://localhost:3001/shop/:id/${sessionID}/mycart`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getCartData()
      .then((res) => this.setState({ items: res.data.items }))
      .catch((err) => console.error(err));
  }

  render() {
    const items = this.state.items;
    return <section>{items && <GenerateCartPreview items={items} />}</section>;
  }
}

export default CheckoutView;
