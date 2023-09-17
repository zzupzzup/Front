import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { click_log } from "../../api/api";
import { useRecoilState } from "recoil";
import { selectStore } from "../../Atom";
import "./SimilarStore.css";

const SimilarStore = (props) => {
  const navigate = useNavigate();
  const { store } = props;
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러
  const user = JSON.parse(localStorage.getItem("user"));

  //선택했을 때
  const clickStore = () => {
    setcheckedStore(store.id);
  };

  const clickStoreTitle = () => {
    poststoreClick(store.id, user.id);
    navigate(`/detail/${store.id}`);
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
    <div
      className="store-similar"
      key={store.id}
      onClick={clickStore}
    >
      <div style={{ display: "flex" }}>
        <img
          src={store.img_url}
          className="store-similar-img"
        ></img>
        <div className="store-similar-content">
          <div>
            <span
              className="store-title"
              onClick={clickStoreTitle}
            >
              {store.store}
            </span>
          </div>
          <div className="store-type">{store.category}</div>
          <div className="store-address">{store.address}</div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default SimilarStore;
