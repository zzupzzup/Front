import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import MyPage from "./pages/MyPage/MyPage";
import Detail from "./pages/Detail/Detail";
import Plus from "./pages/Plus/Plus";
import { RecoilRoot } from "recoil";
import "./App.css";

function App() {
  // 빌드 후 배포
  // npm run build
  // firebase deploy --only hosting

  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <div className="-main">
            <Routes>
              <Route
                path="/"
                element={<Main />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/auth"
                element={<Auth />}
              />
              <Route
                path="/mypage"
                element={<MyPage />}
              />
              <Route
                path="/detail/:storeIdx"
                element={<Detail />}
              />
              <Route
                path="/plus"
                element={<Plus />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
