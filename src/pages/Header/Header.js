import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_head.png";
import mypage from "../../assets/mypage.png";
import "./Header.css";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header">
      <Link to="/">
        <img
          src={logo}
          className="logo"
          alt=""
        />
      </Link>
      <Link
        to="/"
        style={{ textDecoration: "none" }}
      >
        <div className="title">쩝쩝학사</div>
      </Link>

      {user ? (
        <Link to="/mypage">
          <img
            src={mypage}
            className="mypage"
            alt=""
          />
        </Link>
      ) : (
        <Link to="/login">
          <img
            src={mypage}
            className="mypage"
            alt=""
          />
        </Link>
      )}
    </div>
  );
};

export default Header;
