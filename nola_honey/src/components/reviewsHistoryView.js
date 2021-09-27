import React from "react";
import axios from "axios";

class ReviewsHistoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      userID: null,
    };
  }

  getReviewsData = async () => {
    try {
      const userID = this.state.userID;
      const data = await axios.get("");
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getReviewsData()
      .then((res) => this.setState({ reviews: res.data.reviews }))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <section>
        <h1>Hello</h1>
      </section>
    );
  }
}

export default ReviewsHistoryView;
