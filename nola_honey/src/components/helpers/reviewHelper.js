import React from "react";
import StarsRating from "stars-rating";

function GenerateReviewForm(props) {
  return (
    <form>
      <label>Rating:</label>
      <StarsRating
        count={5}
        size={24}
        color2={"#fbb03b"}
        onChange={props.onRating}
        value={props.rating}
      />
      <label>Title:</label>
      <input type="text" onChange={props.onChange} name="title"></input>
      <label>Comment:</label>
      <textarea onChange={props.onChange} name="comment"></textarea>
      <input onClick={props.onClick} type="button" value="Leave Review"></input>
    </form>
  );
}

function ReformateDate(props) {
  const date = props.date;
  const getDate = date.slice(0, 10).split("-");
  const reformatedDate = `${getDate[1]} / ${getDate[2]} / ${getDate[0]}`;
  return reformatedDate;
}

function GenerateReviews(props) {
  const reviews = props.reviews;
  const rating = parseInt(props.rating);
  return (
    <section>
      {reviews.map((review, i) => {
        <div key={i}>
          <p>Rating:</p>
          <StarsRating
            value={rating}
            edit={false}
            count={5}
            size={24}
            color2={"#fbb03b"}
          />
          <h4>{review.title}</h4>
          <p>{review.comment}</p>
          <p>{review.author}</p>
          <p>
            <ReformateDate reviews={review.date} />
          </p>
        </div>;
      })}
    </section>
  );
}

export default GenerateReviewForm;
export { GenerateReviews };
