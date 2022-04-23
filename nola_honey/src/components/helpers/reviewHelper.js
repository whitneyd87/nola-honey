import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

function GenerateReviewForm(props) {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <form className="form">
      <label className="form-label">Rating:</label>
      <Rating
        ratingValue={rating}
        iconsCount={5}
        size={24}
        fillColor={"#fbb03b"}
        onClick={handleRating}
        allowHalfIcon={true}
      />
      <label className="form-label">Title:</label>
      <input
        type="text"
        onChange={props.onChange}
        name="title"
        className="form-input"
      ></input>
      <label className="form-label">Comment:</label>
      <textarea
        className="form-text"
        onChange={props.onChange}
        name="comment"
      ></textarea>
      <input
        onClick={props.onClick}
        type="button"
        value="Leave Review"
        className="form-btn"
      ></input>
    </form>
  );
}

function ReformateDate(props) {
  const date = props.date;
  const getDate = date.slice(0, 10).split("-");
  const reformatedDate = `${getDate[1]} / ${getDate[2]} / ${getDate[0]}`;
  return reformatedDate;
}

// function GenerateReviews(props) {
//   const reviews = props.reviews;
//   console.log(reviews);
//   return reviews.map((review, i) => {
//     <div key={i}>
//       <p>Rating:</p>
//       <Rating
//         ratingValue={parseInt(review.rating)}
//         readonly={true}
//         iconsCount={5}
//         size={24}
//         fillColor={"#fbb03b"}
//       />
//       <h4>{review.title}</h4>
//       <p>{review.comment}</p>
//       <p>{review.author}</p>
//     </div>;
//   });
// }

export default GenerateReviewForm;
// export { GenerateReviews };
