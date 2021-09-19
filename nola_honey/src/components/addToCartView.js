import React from "react";
import axios from "axios";
import { GenerateItemAdded } from "./helpers/itemHelper";

class AddToCartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      quantity: null,
      size: null,
      itemsPreview: null,
      sessionID: localStorage.getItem("sessionID"),
    };
  }

  // Get most recent item added to cart
  getItemAddedInfo = async () => {
    try {
      const { id } = this.props.match.params;
      const sessionID = this.state.sessionID;
      const data = await axios.get(
        `http://localhost:3001/shop/${id}/addtocart/${sessionID}`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getItemAddedInfo()
      .then((res) =>
        this.setState({
          item: res.data.item,
          size: res.data.size,
          quantity: res.data.quantity,
          itemsPreview: res.data.itemsPreview,
        })
      )
      .catch((err) => console.error(err));
  }

  render() {
    const item = this.state.item;
    const size = this.state.size;
    const quantity = this.state.quantity;
    const itemsPreview = this.state.itemsPreview;
    return (
      <section>
        {item && (
          <GenerateItemAdded
            item={item}
            size={size}
            quantity={quantity}
            items={itemsPreview}
          />
        )}
      </section>
    );
  }
}

export default AddToCartView;
