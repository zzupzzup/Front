import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect'
import BrowserLogin from './pages/Login/BrowserLogin';
import MobileLogin from './pages/Login/MobileLogin';
import BrowserAuth from './pages/Auth/BrowserAuth';
import MobileAuth from './pages/Auth/MobileAuth';
import BrowserMain from './pages/Main/BrowserMain';
import MobileMain from './pages/Main/MobileMain';
import BrowserMyPage from './pages/MyPage/BrowserMyPage';
import MobileMyPage from './pages/MyPage/MobileMyPage';
import BrowserDetail from './pages/Detail/BrowserDetail';
import {authService} from './firebase';
import {RecoilRoot} from 'recoil';
import './App.css';


function App() {
  // 빌드 후 배포
  // npm run build
  // firebase deploy --only hosting
  
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserView>
          <BrowserRouter>
            <div className='browser-main'>
              <Routes>
                <Route path="/" element={<BrowserMain />} />
                <Route path="/login" element={<BrowserLogin />} />
                <Route path="/auth" element={<BrowserAuth />} />
								<Route path="/mypage" element={<BrowserMyPage />} />
                <Route path="/detail/:storeIdx" element={<BrowserDetail />} />
              </Routes>
            </div>
          </BrowserRouter>
        </BrowserView>
        <MobileView>
          <BrowserRouter>
            <div className='mobile-main'>
              <Routes>
                <Route path="/" element={<MobileMain />} />
                <Route path="/login" element={<MobileLogin />} />
                <Route path="/auth" element={<MobileAuth />} />
								{/* <Route path="/mypage" element={<MobileMyPage />} /> */}
              </Routes>
            </div>
          </BrowserRouter>
        </MobileView>
      </div>
    </RecoilRoot>
  );
}

export default App;