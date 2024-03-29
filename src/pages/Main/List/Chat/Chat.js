import React from "react";
import { useState, useEffect, useRef } from "react";
import { chatRRS } from "../../../../api/api";
import { useRecoilState } from "recoil";
import { resultChat, firstChat, selectStore, selectArea, selectType } from "../../../../Atom";
import { Filter } from "../Filter/Filter";
import searchIcon from "../../../../assets/search_icon.webp";
import noResult from "../../../../assets/noResult.png";
import ChatStore from "../../../../components/Store/ChatStore";
import "./Chat.css";

const Chat = (props) => {
  const { chatbot } = props;
  const storeListRef = useRef(null);
  const [selArea, setSelArea] = useRecoilState(selectArea);
  const [selType, setSelType] = useRecoilState(selectType);
  const [originalChat, setOriginalChat] = useRecoilState(firstChat);
  const [searchResult, setSearchResult] = useRecoilState(resultChat);
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [text, setText] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setcheckedStore(null);
    if (storeListRef.current) {
      storeListRef.current.scrollTo({
        top: 0,
      });
    }
    if (localStorage.getItem("searchTerm")) {
      setSearchTerm(localStorage.getItem("searchTerm"));
    }
  }, []);

  //검색
  const onChange = (e) => {
    setText(true);
    if (e.target.value === "") {
      setText(false);
    }
    setSearchTerm(e.target.value);
    e.preventDefault();
  };

  const onClick = () => {
    localStorage.setItem("searchTerm", searchTerm);
    SearchPost(user.id, searchTerm);
  };

  const SearchPost = async (id, key) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = chatRRS(id, key);
      setSearchResult(response.data);
      setOriginalChat(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  //필터링
  useEffect(() => {
    if (searchResult) {
      setSearchResult(originalChat);

      if (selArea) {
        setSearchResult((state) => Filter(state, selArea, selType));
      }
    }
  }, [originalChat, chatbot, selArea, selType]);

  useEffect(() => {
    if (storeListRef.current && checkedStore) {
      const index = searchResult.findIndex((store) => store.id === checkedStore);
      storeListRef.current.scrollTo({
        top: index * 106,
        behavior: "smooth",
      });
    }
  }, [checkedStore, searchResult]);

  return (
    <div className="chat">
      <div className={`search-bar ${text ? "success" : "fail"}`}>
        <input
          type="text"
          className="search"
          placeholder={searchTerm}
          value={searchTerm}
          onChange={onChange}
        />
        <img
          src={searchIcon}
          className="search-icon"
          alt=""
          onClick={onClick}
        />
      </div>
      {!loading && searchResult && <div style={{ textAlign: "left", margin: "10px 20px", fontSize: "13px" }}>검색결과 ({searchResult.length}개)</div>}
      <div className="store-list">
        {loading ? (
          <div style={{ margin: "150px" }}>로딩중</div>
        ) : searchResult && !searchResult.length ? (
          <div>
            <img
              src={noResult}
              style={{ width: "100px", margin: "30px 120px" }}
            ></img>
            <div style={{ fontSize: "18px", margin: "-10px 0 10px 95px" }}>결과를 찾지 못 했어요.</div>
            <div style={{ margin: "0 60px" }}>검색어나 필터링을 다시 확인해주세요!</div>
          </div>
        ) : (
          searchResult &&
          searchResult.map((store, i) => {
            return (
              <ChatStore
                key={i}
                store={store}
                isScrappedStore={store.userscrap}
              ></ChatStore>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Chat;
