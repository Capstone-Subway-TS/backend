import React, { useState } from 'react'; // useState import 추가
import Main from '../components/section/Main';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가

const Signup = () => { 
    const [formData, setFormData] = useState({
        userId: '',
        userNickname: '',
        userTelNumber: '',
        userPassword: '',
        userName: '',
        userDate: ''
    });

    const { userId, userNickname, userTelNumber, userPassword, userName, userDate } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const navigate = useNavigate(); // useNavigate hook을 사용하여 navigate 함수 가져오기

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('회원가입이 성공적으로 완료되었습니다.'); // 회원가입 성공 메시지 표시
                // 로그인 페이지로 이동
                navigate('/login');
            } else {
                alert(data.message || '회원가입에 실패했습니다.'); // 서버에서 전달된 메시지 또는 기본 메시지 표시
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버와의 통신 중 오류가 발생했습니다.'); // 오류 메시지 표시
        }
    };

    return (
        <Main title="회원가입" description="회원가입 페이지">
            <div className="form-container">
                <form className="signup-form" onSubmit={onSubmit}>
                    <h2>회원가입</h2>
                    <div className="form-group">
                        <label htmlFor="userId">아이디</label>
                        <input type="text" id="userId" name="userId" value={userId} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPassword">비밀번호</label>
                        <input type="password" id="userPassword" name="userPassword" value={userPassword} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userNickname">닉네임</label>
                        <input type="text" id="userNickname" name="userNickname" value={userNickname} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userTelNumber">전화번호</label>
                        <input type="text" id="userTelNumber" name="userTelNumber" value={userTelNumber} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName">이름</label>
                        <input type="text" id="userName" name="userName" value={userName} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userDate">생년월일(8자리)</label>
                        <input type="text" id="userDate" name="userDate" value={userDate} onChange={onChange} required />
                    </div>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </Main>
    );
}

export default Signup;