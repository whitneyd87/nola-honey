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

  handleRefresh() {
    if (this.props.location.state) {
      // console.log(this.props.location.state.items);
      this.setState({ items: this.props.location.state.items });
      const items = JSON.stringify(this.props.location.state.items);
      localStorage.setItem("cartItems", items);
    } else this.setState({ refresh: true });
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
    if (this.props.location.state && this.props.location.state.items) {
      this.handleRefresh();
      // console.log(this.state.items);
    } else {
      const items = JSON.parse(localStorage.getItem("cartItems"));
      this.setState({ items });
    }
    /*
    this.getCartData()
      .then((res) => this.setState({ items: res.data.items }))
      .catch((err) => console.error(err));
      */
  }
  componentWillUnmount() {
    this.setState({ items: null });
  }

  render() {
    const items = this.state.items;
    const deletedItem = this.state.deletedItem;
    console.log(deletedItem);
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
