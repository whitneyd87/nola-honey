import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { GenerateItemPreview } from "./helpers/itemHelper";
import GenerateReviewForm, { GenerateReviews } from "./helpers/reviewHelper";

class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      size: null,
      quantity: null,
      maxQty: 10,
      formSubmitted: false,
      rating: null,
      title: null,
      comment: null,
      reviews: null,
    };
    this.qtyRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRating = this.handleRating.bind(this);
  }

  // Item
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ formSubmitted: true });
  }

  //Reviews
  handleRating(value) {
    console.log(value);
    this.setState({ rating: value });
  }

  handleSubmitReview(e) {
    e.preventDefault();
    this.createReview()
      .then((res) => this.setState({ reviews: res.data.reviews }))
      .catch((err) => console.error(err));
  }

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
      const { id } = this.state.item._id;
      const data = await axios.post(
        `http://localhost:3001/shop/${id}`,
        {
          _id: this.state.item._id,
          orderInventory: [
            {
              size: this.state.size,
              quantity: this.state.quantity,
            },
          ],
        },
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // Create Review
  createReview = async () => {
    try {
      const { id } = this.props.match.params;
      const data = await axios.post(
        `http://localhost:3001/shop/${id}/review`,
        {
          rating: this.state.rating,
          title: this.state.title,
          comment: this.state.comment,
          itemID: id,
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
          reviews: res.data.item.reviews,
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
    const formSubmitted = this.state.formSubmitted;
    const rating = this.state.rating;
    const reviews = this.state.reviews;
    console.log(reviews);
    return (
      <section>
        {formSubmitted && (
          <Redirect
            to={{
              pathname: `/shop/${item._id}/addtocart`,
              state: { redirect: true },
            }}
          />
        )}
        {item && (
          <div>
            <GenerateItemPreview
              ref={this.qtyRef}
              item={item}
              maxQty={maxQty}
              onSubmit={this.handleSubmit}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        )}
        <div>
          <h3>Leave a Review</h3>
          <GenerateReviewForm
            onChange={(e) => this.handleChange(e)}
            onRating={(value) => this.handleRating(value)}
            rating={rating}
            onClick={(e) => this.handleSubmitReview(e)}
          />
          {reviews && <GenerateReviews reviews={reviews} />}
        </div>
      </section>
    );
  }
}

export default ItemView;
