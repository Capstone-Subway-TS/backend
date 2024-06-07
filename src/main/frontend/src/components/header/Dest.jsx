import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dest = () => {
    const navigate = useNavigate();
    const startStation = useSelector(state => state.startStation);
    const endStation = useSelector(state => state.endStation);

    const navigateToNavPage = () => {
        navigate('/nav', { state: { startStation, endStation } });
    };

    return (
        <div className="dest-container">
            <div className="dest-details">
                {startStation ? (
                    <h2 className="dest-heading">출발지: <span className="dest-label">{startStation}</span></h2>
                ) : (
                    <h2 className="dest-heading">출발지 정보가 없습니다.</h2>
                )}
                {endStation ? (
                    <h2 className="dest-heading">도착지: <span className="dest-label">{endStation}</span></h2>
                ) : (
                    <h2 className="dest-heading">도착지 정보가 없습니다.</h2>
                )}
            </div>
            <button className="dest-button" onClick={navigateToNavPage}>실시간 길찾기</button>
        </div>
    );
};

export default Dest;
