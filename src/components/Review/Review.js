import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import userLogo from "../../assets/user_logo.png";
import "./Review.css";

const Review = (props) => {
  const navigate = useNavigate();
  const { idx, review } = props;

  return (
    <div key={idx}>
      <div style={{ display: "flex" }}>
        <img
          src={userLogo}
          className="store-detail-user-img"
        ></img>
        <div style={{ paddingTop: "15px" }}> 익명{idx + 1}</div>
      </div>
      <div style={{ padding: "5px 10px", fontWeight: "100" }}>{review}</div>
      <hr></hr>
    </div>
  );
};

export default Review;
