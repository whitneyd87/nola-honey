import React from "react";
import axios from "axios";
import { GenerateCartItems } from "./helpers/itemHelper";
import { Redirect } from "react-router";

class MyCartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      refresh: false,
      deletedItemID: null,
    };
    this._emptyCart = false;
  }

  handleDelete(e) {
    const parentEl = e.target.closest(".item-wrapper");
    const itemID = parentEl.id;
    this.setState({ deletedItemID: itemID });
  }

  handleRefresh() {
    this.setState({ refresh: true });
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
    if (this.props.location.state) this.handleRefresh();

    this.getCartData()
      .then((res) => this.setState({ items: res.data.items }))
      .catch((err) => console.error(err));
  }

  render() {
    const items = this.state.items;
    const deletedItem = this.state.deletedItemID;
    if (deletedItem)
      return (
        <Redirect
          to={{
            pathname: "/shop/mycart/delete",
            state: { itemID: deletedItem },
          }}
        />
      );
    return (
      <section>
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
