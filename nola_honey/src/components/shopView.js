import React from "react";
import GenerateShopItems from "./helpers/itemHelper.js";
import axios from "axios";
import { NavHashLink as NavLink } from "react-router-hash-link";

class ShopView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
    };
  }

  getItemsIndex = async () => {
    try {
      const data = await axios.get("http://localhost:3001/shop");
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getItemsIndex()
      .then((res) => this.setState({ items: res.data.items }))
      .catch((err) => console.error(err));
  }

  render() {
    const items = this.state.items;
    return (
      <section className="shop-wrapper">
        <NavLink to="/shop/mycart">
          <button>Go To Cart</button>
        </NavLink>

        {items && <GenerateShopItems items={items} type="index" />}
      </section>
    );
  }
}

export default ShopView;
