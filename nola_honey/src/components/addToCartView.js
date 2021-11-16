import React from "react";
import axios from "axios";
import { GenerateItemAdded } from "./helpers/itemHelper";

class AddToCartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      orderInventory: null,
      itemsPreview: null,
      cartItems: null,
      refresh: false,
    };
  }

  // Get most recent item added to cart
  getItemData = async () => {
    try {
      const { id } = this.props.match.params;
      const data = await axios.get(
        `http://localhost:3001/shop/${id}/addtocart`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // Set localStorage item "cartItems" with cart items data
  setCartData() {
    const cartItems = JSON.stringify(this.state.cartItems);
    localStorage.setItem("cartItems", cartItems);
  }

  handleRefresh() {
    this.setState({ refresh: true });
  }

  componentDidMount() {
    if (this.props.location.state) this.handleRefresh();
    this.getItemData()
      .then((res) =>
        this.setState({
          item: res.data.item,
          orderInventory: res.data.orderInventory,
          itemsPreview: res.data.itemsPreview,
          cartItems: res.data.cartItems,
        })
      )
      .catch((err) => console.error(err));
  }

  componentWillUnmount() {
    this.setCartData();
  }

  render() {
    const item = this.state.item;
    const orderInventory = this.state.orderInventory;
    const itemsPreview = this.state.itemsPreview;
    return (
      <section>
        {item && (
          <GenerateItemAdded
            item={item}
            orderInventory={orderInventory}
            items={itemsPreview}
          />
        )}
      </section>
    );
  }
}

export default AddToCartView;
