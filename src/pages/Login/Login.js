import React from "react";
import { authService } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import './Login.css';

const Login = ()=>{
    const navigate = useNavigate();

    const onSocialClick = async(e)=>{
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider);
        localStorage.setItem('nickname', data.user.displayName);
        localStorage.setItem('UId', data.user.reloadUserInfo.localId);
        navigate("/");
    }

    return(
      <div className="login">
        <div className="subtitle">로그인창</div>
        <div>
            <button className='login-btn' name="google" onClick={onSocialClick} style={{cursor: 'pointer'}}>Continue with Google</button>
        </div>
      </div>
    )
}

export default Login