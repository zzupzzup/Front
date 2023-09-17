import React from "react";
import { useState, useEffect, useRef } from "react";
import { personalModel, firstModel } from "../../../../api/api";
import { useRecoilState } from "recoil";
import { resultCheck, firstCheck, selectStore, selectArea, selectType } from "../../../../Atom";
import { Filter } from "../Filter/Filter";
import noResult from "../../../../assets/noResult.png";
import CheckStore from "../../../../components/Store/CheckStore";
import "./Check.css";

const Check = (props) => {
  const { chatbot } = props;
  const storeListRef = useRef(null);
  const [selArea, setSelArea] = useRecoilState(selectArea);
  const [selType, setSelType] = useRecoilState(selectType);
  const [originalCheck, setOriginalCheck] = useRecoilState(firstCheck);
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [storeList, setStoreList] = useRecoilState(resultCheck); //결과값
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setcheckedStore(null);
    storeListRef.current.scrollTo({
      top: 0,
    });
  }, []);

  //결과 가져오기
  useEffect(() => {
    if (user.click_log_cnt === 0) {
      fetchfirstModel(user.category, user.id);
    } else {
      if (user.click_log_cnt > 10) {
        fetchpresonalModel(user.id);
      } else {
        if (originalCheck && originalCheck.length < 30 + 2 * user.click_log_cnt) {
          fetchfirstModel(user.category, user.id);
        }
      }
    }
  }, []);

  const fetchpresonalModel = async (id) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = personalModel(id);
      setStoreList(response.data);
      setOriginalCheck(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const fetchfirstModel = async (category, id) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = firstModel(category, id);
      setStoreList(response.data.slice(0, 30 + 2 * user.click_log_cnt));
      setOriginalCheck(response.data.slice(0, 30 + 2 * user.click_log_cnt));
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  //필터링
  useEffect(() => {
    if (storeList) {
      setStoreList(originalCheck);

      if (selArea) {
        setStoreList((state) => Filter(state, selArea, selType));
      }
    }
  }, [originalCheck, chatbot, selArea, selType]);

  //스크롤
  useEffect(() => {
    if (storeListRef.current && checkedStore) {
      const index = storeList.findIndex((store) => store.id === checkedStore);
      storeListRef.current.scrollTo({
        top: index * 87,
        behavior: "smooth",
      });
    }
  }, [checkedStore, storeList]);

  return (
    <div className="check">
      {!loading && storeList && <div style={{ textAlign: "left", width: "90%", fontSize: "13px" }}>검색결과 ({storeList.length}개)</div>}
      <div
        className="store-check-list"
        ref={storeListRef}
      >
        {loading ? (
          <div style={{ margin: "150px" }}>로딩중</div>
        ) : storeList && !storeList.length ? (
          <div>
            <img
              src={noResult}
              style={{ width: "100px", margin: "60px 120px" }}
            ></img>
            <div style={{ fontSize: "18px", margin: "-40px 0 10px 95px" }}>결과를 찾지 못 했어요.</div>
            <div style={{ margin: "0 90px" }}>필터링을 다시 확인해주세요!</div>
          </div>
        ) : (
          storeList &&
          storeList.map((store, i) => (
            <CheckStore
              key={i}
              store={store}
              isScrappedStore={store.userscrap}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Check;
