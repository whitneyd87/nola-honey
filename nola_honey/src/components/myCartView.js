import React from "react";
import axios from "axios";
import { GenerateCartItems } from "./helpers/itemHelper";
import { Redirect } from "react-router";

class MyCartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      deletedItem: null,
      refresh: false,
    };
    this._emptyCart = false;
  }

  handleDelete(e) {
    const el = e.target.parentNode.previousSibling.previousSibling;
    const itemID = el.id;
    const items = this.state.items;
    const deletedItem = items.filter((item) => item._id._id === itemID);
    this.setState({ deletedItem: deletedItem });
  }

  getCartData = async () => {
    try {
      const data = await axios.get(`http://localhost:3001/shop/mycart`, {
        withCredentials: true,
      });
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
    const deletedItem = this.state.deletedItem;
    return (
      <section>
        {deletedItem && (
          <Redirect
            to={{
              pathname: "/shop/mycart/delete",
              state: { deletedItem: deletedItem },
            }}
          />
        )}
        {items && items.length === 0 && <h1>Cart is Empty.</h1>}
        {items && (
          <GenerateCartItems
            items={items}
            onClick={(e) => this.handleDelete(e)}
          />
        )}
      </section>
    );
  }
}

export default MyCartView;
