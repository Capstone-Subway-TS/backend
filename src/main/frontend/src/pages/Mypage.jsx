import React from 'react';
import { Link } from 'react-router-dom'; // React Router를 사용한다고 가정합니다.
import Main from '../components/section/Main';

const Mypage = () => {
    return (
        <Main title="마이페이지" description="마이페이지">
            <h1>여기에 뭘 넣으면 좋겠나요 박종서씨</h1>
        </Main>
    );
};

export default Mypage;