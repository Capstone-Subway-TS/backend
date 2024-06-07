import React from 'react';
import { Link } from 'react-router-dom'; // React Router를 사용한다고 가정합니다.
import Main from '../components/section/Main';

const Login = () => { 
    return (
        <Main title="로그인" description="로그인 페이지">

            {
            <div className="login-container">
                <form className="login-form">
                    <h2>로그인</h2>
                    <div className="form-group">
                        <label htmlFor="text">아이디</label>
                        <input type="text" id="text" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" required />
                    </div>
                    <button type="submit">로그인</button>
                    <div className="signup-link">
                        <Link to="/signup">회원가입</Link>
                    </div>
                </form>
            </div>
        }


        
        </Main>
    );
};

export default Login;


