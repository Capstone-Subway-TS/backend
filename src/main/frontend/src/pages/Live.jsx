import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Main from '../components/section/Main';

const lineImages = {
    1001: require('../assets/img/subwaymapmarker/1호선마커.png'),
    1002: require('../assets/img/subwaymapmarker/2호선마커.png'),
    1003: require('../assets/img/subwaymapmarker/3호선마커.png'),
    1004: require('../assets/img/subwaymapmarker/4호선마커.png'),
    1005: require('../assets/img/subwaymapmarker/5호선마커.png'),
    1006: require('../assets/img/subwaymapmarker/6호선마커.png'),
    1007: require('../assets/img/subwaymapmarker/7호선마커.png'),
    1008: require('../assets/img/subwaymapmarker/8호선마커.png'),
    1009: require('../assets/img/subwaymapmarker/9호선마커.png'),
    // 다른 지하철 호선에 대한 이미지 경로 추가
};



const Live = () => {
    const [arrivalInfo, setArrivalInfo] = useState(null); // 도착 정보 상태

    const location = useLocation();
    const stationName = location.state && location.state.stationName;

    const fetchDataFromFlask = async () => {
        try {
            // 요청을 보냄
            const response = await fetch("http://flask:8082/receive_subway_arrive", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "stationName": stationName }), // 데이터를 JSON 문자열로 변환하여 전송
            });

            // 응답을 JSON 형식으로 파싱
            const data = await response.json();

            // 받아온 도착 정보를 상태에 저장
            setArrivalInfo(data);
        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
        }
    };
    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        fetchDataFromFlask();
    }, [stationName]); // stationName이 변경될 때마다 fetchDataFromFlask 호출


    function getLineImage(subwayId) {
        return lineImages[subwayId];
    }
    function getSubwayLineName(subwayId) {
        switch(subwayId) {
            case 1001:
                return "1호선";
            case 1002:
                return "2호선";
            case 1003:
                return "3호선";
            case 1004:
                return "4호선";
            case 1005:
                return "5호선";
            case 1006:
                return "6호선";
            case 1007:
                return "7호선";
            case 1008:
                return "8호선";
            case 1009:
                return "9호선";
            // 다른 호선에 대한 경우도 추가
            default:
                return "해당없음";
        }
    }
    return (
        <Main
            title="상행하행"
            description="테스트 페이지"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} // 전체 틀을 가운데 정렬합니다.
        >
            {/* stationName이 존재하는 경우에만 아래 내용을 표시 */}
            {stationName && (
                <div>
                    <h2>💡 {stationName}의 실시간 도착 정보</h2>
                    <br/>
                    <br/>
                    {/* arrivalInfo가 존재하는 경우에만 아래 내용을 표시 */}
                    {arrivalInfo && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            {/* arrivalInfo를 순회하며 각 도착 정보를 출력 */}
                            {arrivalInfo.map((info, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                                    {/* 첫 번째 열차와 두 번째 열차를 수평으로 출력 */}
                                    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginRight: '10px' }}>
                                        {/* 열차 정보와 도착 정보 */}
                                        <p>
                                            <img
                                                style={{ width: '20px', height: 'auto', verticalAlign: 'middle' }}
                                                src={getLineImage(info.subwayId)}
                                                alt="Subway Line Marker"
                                            />
                                            {getSubwayLineName(info.subwayId)}
                                        </p>
                                        {/*<p>
                                            {info.trainLineNm} {index % 2 === 0 ? '- 첫 번째 열차' : '- 두 번째 열차'}
                                        </p>
                                        <br/>
                                        <p>
                                            👉 {info.recptnDt} 기준 <span style={{ color: 'red' }}>{(info.barvlDt / 60).toFixed(2)}분</span> 뒤 도착
                                        </p>
                                        <br/>
                                        <p>✔ 현위치 : {info.arvlMsg3}</p>*/}
                                        <p>지하철역명 : {info.statnNm}</p>
                                        <p>총 데이터 건수 : {info.totalCount}</p>
                                        <p>현재 데이터 번호 : {info.rowNum}</p>
                                        <p>지하철호선ID : {info.subwayId}</p>
                                        <p>상하행선구분 : {info.updnLine}</p>
                                        <p>도착지방면 : {info.trainLineNm}</p>
                                        <p>열차종류 : {info.btrainSttus}</p>
                                        <p>열차도착예정시간 : {info.barvlDt}(초)</p>
                                        <p>종착지하철역명 : {info.bstatnNm}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {/* stationName이 존재하지 않는 경우에만 아래 내용을 표시 */}
            {!stationName && (
                <div>
                    <h1>실시간 도착정보가 없습니다.</h1>
                    <h4>지도에서 실시간 도착정보를 클릭해주세요.</h4>
                </div>
            )}
        </Main>
    );
};

export default Live;