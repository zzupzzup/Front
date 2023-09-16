import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/api";
import Input from "../../components/Common/Input";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [pressBtn, sePressBtn] = useState(false);
  const [checkedTypes, setcheckedTypes] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러

  // 음식 카테고리
  const type = [
    { id: 1, name: "한식" },
    { id: 2, name: "일식" },
    { id: 3, name: "술집" },
    { id: 4, name: "양식" },
    { id: 5, name: "중식" },
    { id: 6, name: "분식" },
    { id: 7, name: "카페" },
    { id: 8, name: "숯불구이" },
    { id: 9, name: "기타" },
  ];

  //각 카테고리 버튼 눌렀을 때
  const checkHandler = ({ target }) => {
    if (target.checked) {
      setcheckedTypes([...checkedTypes, target.value]);
    } else if (!target.checked) {
      target.checked = false;
      setcheckedTypes(checkedTypes.filter((each) => each !== target.value));
    }
    if (checkedTypes.length > 2 && !checkedTypes.includes(target.value)) {
      alert("최대 3개까지 선택 가능합니다.");
      setcheckedTypes(checkedTypes.filter((each) => each !== target.value));
      target.checked = false;
    }
    return checkedTypes;
  };

  //버튼 클릭
  const onSignUpClick = async (e) => {
    e.preventDefault();
    sePressBtn(true);
    if (password !== passwordCheck) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }
    if (email && password && passwordCheck && name && sex && age && checkedTypes.length) {
      postData(email, password, name, sex, age, checkedTypes);
    }
  };

  const postData = async (email, password, name, sex, age, checkedTypes) => {
    try {
      setError(null);
      setLoading(true);
      auth(email, password, name, sex, age, checkedTypes);
      navigate("/login");
    } catch (e) {
      if (e.response.data.msg === "EMAIL_EXISTS") {
        return alert("중복된 이메일입니다. 다시 확인해주세요.");
      }
      setError(e);
    }
    setLoading(false);
  };

  return (
    <div className="auth">
      <div className="auth-contents">
        <div className="auth-content-scroll">
          <div className="auth-title">
            <p style={{ fontSize: "18px" }}>회원가입</p>
          </div>
          <div className="auth_warp">
            <Input
              label="이메일 (ID)"
              type="email"
              placeholder="email 형식"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              isValid={pressBtn && email}
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              isValid={pressBtn && password}
            />
            <Input
              label="비밀번호확인"
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => setPasswordCheck(e.target.value)}
              value={passwordCheck}
              isValid={pressBtn && passwordCheck}
            />
            <Input
              label="닉네임"
              type="text"
              placeholder="닉네임"
              onChange={(e) => setName(e.target.value)}
              value={name}
              isValid={pressBtn && name}
            />
            <div
              className="auth_items"
              style={{ height: "75px" }}
            >
              <div className="auth_text">
                <span className={`text_bar ${pressBtn ? "" : sex ? "success" : "fail"}`}>성별</span>
              </div>
              <div className="auth-check-sex">
                <input
                  type="radio"
                  id="man"
                  name="sex"
                  value="man"
                  onChange={(e) => setSex(e.target.value)}
                />
                <label for="man"> 남</label>
                <input
                  type="radio"
                  id="woman"
                  name="sex"
                  value="woman"
                  onChange={(e) => setSex(e.target.value)}
                />
                <label for="woman"> 여</label>
              </div>
            </div>
            <Input
              label="나이"
              type="text"
              placeholder="나이(숫자만)"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              isValid={pressBtn && age}
            />
            <div className="auth_items_type">
              <div className="auth_text">
                <span className={`text_bar ${pressBtn ? "" : checkedTypes.length ? "success" : "fail"}`}>좋아하는 음식 타입(최대 3개)</span>
              </div>
              <div className="select-type">
                {type.map((item) => (
                  <div
                    className="check-type"
                    key={item.id}
                  >
                    <input
                      type="checkbox"
                      value={item.name || ""}
                      id={item.id}
                      onChange={(e) => checkHandler(e)}
                    />
                    <label
                      for={item.id}
                      style={item.id === 8 ? { fontSize: "11px", fontWeight: "bold" } : { fontSize: "13.5px" }}
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`start_btn ${pressBtn ? "" : email && password && passwordCheck && name && sex && age && checkedTypes.length ? "success" : "fail"}`}
              onClick={onSignUpClick}
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
