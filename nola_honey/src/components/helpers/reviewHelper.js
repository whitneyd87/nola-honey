import React from "react";
import StarsRating from "stars-rating";

function GenerateReviewForm(props) {
  return (
    <form>
      <label>Rating:</label>
      <StarsRating count={5} size={24} color2={"#fbb03b"} />
      <label>Title:</label>
      <input type="text"></input>
      <label>Review:</label>
      <textarea></textarea>
      <input type="submit" value="Add Review"></input>
    </form>
  );
}

export default GenerateReviewForm;
