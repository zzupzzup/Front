import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect'
import Login from './pages/Login/Login';
import Auth from './pages/Auth/Auth';
import BrowserMain from './pages/Main/BrowserMain';
import MobileMain from './pages/Main/MobileMain';
import BrowserMyPage from './pages/MyPage/BrowserMyPage';
import MobileMyPage from './pages/MyPage/MobileMyPage';
import BrowserDetail from './pages/Detail/BrowserDetail';
import {authService} from './firebase';
import {RecoilRoot} from 'recoil';
import './App.css';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( ()=>{
    authService.onAuthStateChanged((user) =>{
      if (user!==null){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true); //firebase초기화 후 값변경. 초기화 후에야 auth 상태 확인 가능하니까.
    })
  }, [])
  
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserView>
          <BrowserRouter>
            <div className='browser-main'>
              <Routes>
                <Route path="/" element={<BrowserMain />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth" element={<Auth />} />
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
                <Route path="/login" element={<Login />} />
                <Route path="/auth" element={<Auth />} />
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