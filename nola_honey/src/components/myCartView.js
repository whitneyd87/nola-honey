import React from "react";
import axios from "axios";
import { GenerateCartItems } from "./helpers/itemHelper";

class MyCart extends React.Component {
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
        `http://localhost:3001/shop/mycart/${sessionID}`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getCartData()
      .then((res) => {
        this.setState({
          items: res.data.items,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const items = this.state.items;
    return (
      <section>
        {items && (
          <GenerateCartItems onClick={this.handleClick} items={items} />
        )}
      </section>
    );
  }
}

export default MyCart;
