import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Common/Input";
import logo from "../../assets/logo.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSignInClick = async (e) => {
    e.preventDefault();
    setLogin(true);
    if (email && password) {
      postData(email, password);
    }
  };

  const postData = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (e) {
      if (e.response.data.msg === "NO_MATCH_USER") {
        return alert("이메일이나 비밀번호가 틀렸습니다. 다시 한번 확인해주세요.");
      }
      setError(e);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: "#FED06E", height: "100vh" }}>
      <div className="login-content">
        <div>
          <img
            src={logo}
            className="login-logo"
            alt=""
          />
        </div>
        <div className="login_warp">
          <p className="login-title">
            반갑습니다.<br></br>
            쩝쩝학사에서 나에게 딱 맞는 <br></br>
            맛집을 추천 받으세요!
          </p>
          <Input
            label="이메일 (ID)"
            type="email"
            placeholder="email 형식"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            isValid={login && email}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            isValid={login && password}
          />
          <button
            className={`login_btn ${!login ? "" : email && password ? "success" : "fail"}`}
            onClick={onSignInClick}
          >
            로그인하기
          </button>
        </div>
      </div>
      <div className="goto">
        <button
          className="goto-auth"
          onClick={() => navigate("/auth")}
          style={{ cursor: "pointer" }}
        >
          회원가입
        </button>
        <button
          className="goto-main"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          메인화면
        </button>
      </div>
    </div>
  );
};

export default Login;
