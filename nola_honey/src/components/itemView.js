import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { GenerateItemPreview } from "./helpers/itemHelper";
import GenerateReviewForm from "./helpers/reviewHelper";
import { Rating } from "react-simple-star-rating";

class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      size: null,
      quantity: null,
      maxQty: 10,
      formSubmitted: false,
      // rating: null,
      title: null,
      comment: null,
      reviews: null,
    };
    this.qtyRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleRating = this.handleRating.bind(this);
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
  // handleRating(rating) {
  // setRating({ rating });
  // }

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
    // const rating = this.state.rating;
    const reviews = this.state.reviews;
    return (
      <section className="single-item-view">
        {formSubmitted && (
          <Redirect
            to={{
              pathname: `/shop/${item._id}/addtocart`,
              state: { redirect: true },
            }}
          />
        )}
        {item && (
          <GenerateItemPreview
            ref={this.qtyRef}
            item={item}
            maxQty={maxQty}
            onSubmit={this.handleSubmit}
            onChange={(e) => this.handleChange(e)}
          />
        )}
        <div className="review-wrapper">
          <h3 className="review-title">Leave a Review</h3>
          <GenerateReviewForm
            onChange={(e) => this.handleChange(e)}
            // onRating={(rating) => this.handleRating(rating)}
            // rating={rating}
            onClick={(e) => this.handleSubmitReview(e)}
          />
          {reviews &&
            reviews.map((review, i) => (
              <div className="reviews-list" key={i}>
                <p>
                  Rating:
                  <Rating
                    initialValue={parseInt(review.rating)}
                    readonly={true}
                    iconsCount={5}
                    size={24}
                    fillColor={"#fbb03b"}
                  />
                </p>
                <h4 className="review-title">{review.title}</h4>
                <p>{review.comment}</p>
                <p>By: {review.author}</p>
                <hr></hr>
              </div>
            ))}
        </div>
      </section>
    );
  }
}

export default ItemView;
