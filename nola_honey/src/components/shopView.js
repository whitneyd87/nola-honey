import React from "react";
import GenerateItemsIndex from "./helpers/itemHelper.js";
import axios from "axios";

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
        {items && <GenerateItemsIndex items={items} />}
      </section>
    );
  }
}

export default ShopView;
