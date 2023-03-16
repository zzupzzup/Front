import React from "react";
import { authService } from '../firebase';
import {signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import './Login.css';
import {useRecoilState} from 'recoil';
import {userId} from '../Atom';

const Login = ()=>{
    const navigate = useNavigate();
    const [rcUserId, setRcUserId] = useRecoilState(userId);
    
    const onSocialClick = async(e)=>{
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider);
        localStorage.setItem('nickname', data.user.displayName);
        postData(data.user.displayName, data.user.email);
        navigate("/");
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    async function postData(nickname, email) {
        try {
          const response = await axios.post('api/member/add',
            JSON.stringify({nickname, email}),
            { headers }
          );
          setRcUserId(response.data.memberid);
          localStorage.setItem('userId', response.data.memberid);
        } catch (error) {
          console.error(error);
        }
      }
    return(
      <div className="login" style={{marginTop: '20px'}}>
        <div className="subtitle" style={{color: '#166d1e'}}>로그인창</div>
        <div>
            <div style={{marginTop: '40px'}}>
                <button className='login-btn' name="google" onClick={onSocialClick} style={{cursor: 'pointer'}}>Continue with Google</button>
            </div>
        </div>
      </div>
    )
}

export default Login