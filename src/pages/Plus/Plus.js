import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import Header from "../Header/Header";
import userLogo from "../../assets/user_logo.png";
import redArea from "../../assets/red_area.png";
import grayType from "../../assets/gray_type.png";
import "./Plus.css";

const Plus = () => {
  const navigate = useNavigate();
  const [storePlus, setStorePlus] = useState(null); //결과값
  const [originalCheck, setOriginalCheck] = useState(null);
  const [area, setArea] = useState(["마포구", "성동구", "광진구", "서초구", "강남구"]);
  const [type, setType] = useState(["한식", "일식", "술집", "양식", "분식", "카페", "숯불구이", "중식", "기타"]);
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const [allAreaCheck, setAllAreaCheck] = useState(true);
  const [allTypeCheck, setAllTypeCheck] = useState(true);
  const [areas, setAreas] = useState(["마포구", "성동구", "광진구", "서초구", "강남구"]);
  const [types, setTypes] = useState(["한식", "일식", "술집", "양식", "분식", "카페", "숯불구이", "중식", "기타"]);

  const age = parseInt(user.age / 10);
  let gender;
  if (user.gender === "man") {
    gender = "남성";
  } else {
    gender = "여성";
  }

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchstorePlus(user.id);
  }, []);

  const fetchstorePlus = async (id) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.get(`${baseUrl}/boysandgirls?user_id=${id}`, { headers });
      setStorePlus(response.data);
      setOriginalCheck(response.data);
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
      const response = await axios.post(`${baseUrl}/click_log/${id}?user_id=${userId}`, { headers });
      user.click_log_cnt = response.data.click_log_cnt;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  //각 지역 버튼 눌렀을 때
  const handleAreaClick = (e) => {
    checkedAreaHandler(e);
  };

  const checkedAreaHandler = (a) => {
    if (!area.includes(a)) {
      setArea([...area, a]);
      if (area.length === 4) {
        setAllAreaCheck(true);
      }
    } else {
      setArea(area.filter((each) => each !== a));
      setAllAreaCheck(false);
    }
    return area;
  };
  //지역 모두 선택
  const handleAreaAll = () => {
    if (!allAreaCheck) {
      setArea(["마포구", "성동구", "광진구", "서초구", "강남구"]);
      setAllAreaCheck(true);
    } else {
      setArea([]);
      setAllAreaCheck(false);
    }
  };

  //각 음식 카테고리 버튼 눌렀을 때
  const handleTypeClick = (e) => {
    checkedItemHandler(e);
  };

  const checkedItemHandler = (category) => {
    if (!type.includes(category)) {
      setType([...type, category]);
      if (type.length === 8) {
        setAllTypeCheck(true);
      }
    } else {
      setType(type.filter((each) => each !== category));
      setAllTypeCheck(false);
    }
    return type;
  };
  //음식 카테고리 모두 선택
  const handleTypeAll = () => {
    if (!allTypeCheck) {
      setType(["한식", "일식", "술집", "양식", "분식", "카페", "숯불구이", "중식", "기타"]);
      setAllTypeCheck(true);
    } else {
      setType([]);
      setAllTypeCheck(false);
    }
  };

  //필터링
  useEffect(() => {
    setStorePlus(originalCheck);
    if (storePlus) {
      setStorePlus(originalCheck);
      setStorePlus((state) => [...state.filter((store) => area.includes(store.address.substring(4, 7)))]);
      if (storePlus) {
        setStorePlus((state) => [...state.filter((store) => type.includes(store.category))]);
      }
    }
  }, [originalCheck, area, type]);

  return (
    <div>
      <Header></Header>
      <div className="plus">
        <div className="plus-title">
          <span>{age}0</span>대 <span>{gender}</span>들이 많이 간 식당
        </div>
        <div className="plus-modal">
          <div
            className="type"
            style={{ justifyContent: "flex-start" }}
          >
            <div>
              <img
                src={redArea}
                className="plus-area-img"
              />
            </div>
            {areas.map((item, index) => (
              <button
                key={index}
                className={area.includes(item) ? "types yellow" : "types"}
                onClick={() => handleAreaClick(item)}
              >
                {item}
              </button>
            ))}
            <div style={{ margin: "13px" }}>
              <button
                className={allAreaCheck ? "all-check ok" : "all-check"}
                onClick={() => handleAreaAll()}
              >
                ✔
              </button>
              <span> 모두 선택</span>
            </div>
          </div>
          <div
            className="type"
            style={{ justifyContent: "flex-start" }}
          >
            <div>
              <img
                src={grayType}
                className="plus-area-img"
              />
            </div>
            {types.map((item, index) => (
              <button
                key={index}
                className={type.includes(item) ? "types yellow" : "types"}
                onClick={() => handleTypeClick(item)}
              >
                {item}
              </button>
            ))}
            <div style={{ margin: "13px" }}>
              <button
                className={allTypeCheck ? "all-check ok" : "all-check"}
                onClick={() => handleTypeAll()}
              >
                ✔
              </button>
              <span> 모두 선택</span>
            </div>
          </div>
          {storePlus && <div style={{ textAlign: "left", marginTop: "20px" }}>검색결과 ({storePlus.length}개)</div>}
        </div>
        <div className="plus-store-wrap">
          {storePlus &&
            storePlus.map((store, i) => (
              <div
                className="store-plus"
                key={i}
              >
                <img
                  src={store.img_url}
                  className="store-plus-img"
                ></img>
                <div
                  className="store-plus-content"
                  onClick={() => clickStoreTitle(store.id)}
                >
                  <div>
                    <span style={{ fontSize: "18px" }}>{store.store}</span>
                    <span className="store-type"> {store.category}</span>
                  </div>
                  <div className="store-address">{store.address}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Plus;
