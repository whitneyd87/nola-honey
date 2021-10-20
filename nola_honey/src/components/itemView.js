import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { GenerateItemPreview } from "./helpers/itemHelper";

class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      size: null,
      quantity: null,
      maxQty: 10,
      formSubmitted: false,
    };
    this.qtyRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target[e.target.selectedIndex]) {
      this.qtyRef.current.value = "";
      this.qtyRef.current.max =
        e.target[e.target.selectedIndex].getAttribute("data-qty");
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ formSubmitted: true });
  };

  // Item Info
  getItemData = async () => {
    try {
      const { id } = this.props.match.params;
      const data = await axios.get(`http://localhost:3001/shop/${id}`, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // Add Item to cart
  addItem = async () => {
    try {
      const { id } = this.props.match.params;
      const data = await axios.post(
        `http://localhost:3001/shop/${id}`,
        {
          _id: this.state.item._id,
          size: this.state.size,
          quantity: this.state.quantity,
        },
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getItemData()
      .then((res) => {
        this.setState({
          item: res.data.item,
          maxQty: res.data.item.inventory[0].quantity,
        });
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this.addItem()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  render() {
    const item = this.state.item;
    const maxQty = this.state.maxQty;
    if (this.state.formSubmitted)
      return <Redirect to={`/shop/${item._id}/addtocart`} />;
    return (
      <section>
        {item && (
          <GenerateItemPreview
            ref={this.qtyRef}
            item={item}
            maxQty={maxQty}
            onSubmit={this.handleSubmit}
            onChange={(e) => this.handleChange(e)}
          />
        )}
      </section>
    );
  }
}

export default ItemView;
