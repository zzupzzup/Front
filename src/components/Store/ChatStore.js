import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { userLike, userUnlike, click_log } from "../../api/api";
import { useRecoilState } from "recoil";
import { selectStore } from "../../Atom";
import pinkHeart from "../../assets/pink_heart.png";
import emptyHeart from "../../assets/empty_heart.png";
import "./ChatStore.css";

const ChatStore = (props) => {
  const navigate = useNavigate();
  const { store, isScrappedStore } = props;
  const [isScrapped, setIsScrapped] = useState(isScrappedStore);
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
      return "chat-store click";
    } else {
      return "chat-store";
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

  //리뷰보기
  const watchReview = () => {
    setIsReview((state) => !state);
  };

  return (
    <div
      className={setClick(checkedStore)}
      key={store.id}
      onClick={clickStore}
    >
      <div className="store-first">
        <div>
          <span
            className="store-title"
            onClick={clickStoreTitle}
          >
            {store.store}{" "}
          </span>
          <span style={{ fontSize: "13px", color: "#FED06E" }}> {Math.floor(store.score)}% 정확해요</span>
        </div>
      </div>
      <div className="store-type">{store.category}</div>
      <div className="store-address">{store.address}</div>
      <div className="store-last">
        <div
          className="store-review"
          onClick={watchReview}
        >
          대표 리뷰
          {isReview ? <span> 접기▲</span> : <span> 보기▼</span>}
        </div>
      </div>
      <div>
        {isScrapped == 1 ? (
          <img
            src={pinkHeart}
            alt=""
            className="store-like"
            onClick={storeUnScrap}
          />
        ) : (
          <img
            src={emptyHeart}
            alt=""
            className="store-like"
            onClick={storeScrap}
          />
        )}
      </div>
      {isReview ? <div className="store-review-content">"{store.reviewtext}"</div> : <div></div>}
    </div>
  );
};

export default ChatStore;
