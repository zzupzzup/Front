import React from "react";
import { authService } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import logo from '../../assets/logo.png'
import btn_signin from '../../assets/btn_google_signin.png'
import './Login.css';

const Login = ()=>{
    const navigate = useNavigate();

    const onSocialClick = async(e)=>{
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider);
        localStorage.setItem('nickname', data.user.displayName);
        localStorage.setItem('UId', data.user.reloadUserInfo.localId);
        navigate("/");
    }

    const onGotoMainClick = () => {
      navigate("/");
    }

    return(
      <div style={{backgroundColor:'#FED06E', height: '100vh'}}>
				<Header></Header>
        <div className="logo-content">
          <img src={logo} className="login-logo" alt="" />
          <div className="subtitle">반갑습니다.<br></br>
            쩝쩝학사에서 나에게 딱 맞는 <br></br>
            맛집을 추천 받으세요!
          </div>
          <div>
            <img src={btn_signin} className='login-btn' name="google" onClick={onSocialClick} style={{cursor: 'pointer'}}/>
          </div>
        </div>
        <button className='goto-main' onClick={onGotoMainClick} style={{cursor: 'pointer'}}>메인화면으로 가기</button>
      </div>
    )
}

export default Login