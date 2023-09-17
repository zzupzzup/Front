import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { detail, similarRestaurant, userLike, userUnlike, click_log } from "../../api/api";
import DetailMap from "./DetailMap/DetailMap";
import pinkHeart from "../../assets/pink_heart.png";
import emptyHeart from "../../assets/empty_heart.png";
import "./Detail.css";
import SimilarStore from "../../components/Store/SimilarStore";
import Review from "../../components/Review/Review";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isScrapped, setIsScrapped] = useState(false);
  const [storeDetails, setStoreDetails] = useState(null); //결과값
  const [storeSimilar, setStoreSimilar] = useState(null); //결과값
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchstoreDetails(Number(params.storeIdx), user.id);
    fetchstoreSimilar(Number(params.storeIdx), user.id);
  }, [params]);

  const fetchstoreDetails = async (storeId, id) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = detail(storeId, id);
      setStoreDetails(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const fetchstoreSimilar = async (storeId, id) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = similarRestaurant(storeId, id);
      setStoreSimilar(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  //스크랩
  const storeScrap = () => {
    poststoreScrap(Number(params.storeIdx), user.id);
    setIsScrapped((state) => !state);
  };
  const storeUnScrap = () => {
    poststoreUnScrap(Number(params.storeIdx), user.id);
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

  //클릭했을 때
  const clickStoreTitle = (store_id) => {
    poststoreClick(store_id, user.id);
    navigate(`/detail/${store_id}`);
  };

  const poststoreClick = async (id, userId) => {
    try {
      setError(null);
      setLoading(true);
      const response = click_log(id, userId);
      user.click_log_cnt = response.data.click_log_cnt;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return (
    <div>
      {storeDetails && (
        <div
          className="detail"
          key={storeDetails.id}
        >
          <div>
            <span className="store-detail-title">{storeDetails.store}</span>
          </div>
          <div>
            {storeDetails.userscrap === 1 || isScrapped ? (
              <img
                src={pinkHeart}
                alt=""
                className="store-detail-like"
                onClick={storeUnScrap}
              />
            ) : (
              <img
                src={emptyHeart}
                alt=""
                className="store-detail-like"
                onClick={storeScrap}
              />
            )}
          </div>
          <div className="store-detail-second">
            <div className="store-detail-info-second">
              <div className="store-info-title">
                식당 사진 <span className="store-info-subtitle">#{storeDetails.category}</span>
              </div>
              <img
                src={storeDetails.img_url}
                className="store-detail-img"
              ></img>
            </div>
            <div className="store-detail-info-second">
              <div className="store-info-title">
                식당 위치 <span className="store-info-subtitle">{storeDetails.address}</span>
              </div>
              <DetailMap storeAddress={storeDetails.address}></DetailMap>
            </div>
          </div>

          <div className="store-detail-third">
            <div className="store-detail-info">
              <div className="store-info-title">
                리뷰
                <span className="store-info-subtitle">
                  {storeDetails.point}({storeDetails.reviewtext.length})
                </span>
              </div>
              <div className="store-info-review">
                {storeDetails.reviewtext &&
                  storeDetails.reviewtext.map((review, i) => (
                    <Review
                      idx={i}
                      key={i}
                      review={review}
                    />
                  ))}
              </div>
            </div>
            <div className="store-detail-info">
              <div className="store-info-title">유사한 식당 추천</div>
              <div className="store-info-review">
                {storeSimilar &&
                  storeSimilar.map((store, i) => (
                    <SimilarStore
                      key={i}
                      store={store}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
