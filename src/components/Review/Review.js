import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { userLike, userUnlike, click_log } from "../../api/api";
import { useRecoilState } from "recoil";
import { selectStore } from "../../Atom";
import userLogo from "../../assets/user_logo.png";
import "./Review.css";

const Review = (props) => {
  const navigate = useNavigate();
  const { idx, review } = props;
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [isReview, setIsReview] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러
  const user = JSON.parse(localStorage.getItem("user"));

  //선택했을 때
  const clickStore = () => {
    setcheckedStore(store.id);
  };
  const setClick = (id) => {
    if (id === store.id) {
      return "store click";
    } else {
      return "store";
    }
  };
  const clickStoreTitle = () => {
    poststoreClick(store.id, user.id);
    navigate(`/detail/${store.id}`);
  };

  //스크랩
  const storeScrap = () => {
    poststoreScrap(store.id, user.id);
    setIsScrapped((state) => !state);
  };
  const storeUnScrap = () => {
    poststoreUnScrap(store.id, user.id);
    setIsScrapped((state) => !state);
  };

  const poststoreScrap = async (id, userId) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      userLike(id, userId);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const poststoreUnScrap = async (id, userId) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      userUnlike(id, userId);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  //클릭로그
  const poststoreClick = async (id, userId) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = click_log(id, userId);
      user.click_log_cnt = response.data.click_log_cnt;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

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
