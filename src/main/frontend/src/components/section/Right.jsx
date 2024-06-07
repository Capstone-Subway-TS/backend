import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';

const lineImages = {
    1001: require('../../assets/img/subwaymapmarker/1호선마커.png'),
    1002: require('../../assets/img/subwaymapmarker/2호선마커.png'),
    1003: require('../../assets/img/subwaymapmarker/3호선마커.png'),
    1004: require('../../assets/img/subwaymapmarker/4호선마커.png'),
    1005: require('../../assets/img/subwaymapmarker/5호선마커.png'),
    1006: require('../../assets/img/subwaymapmarker/6호선마커.png'),
    1007: require('../../assets/img/subwaymapmarker/7호선마커.png'),
    1008: require('../../assets/img/subwaymapmarker/8호선마커.png'),
    1009: require('../../assets/img/subwaymapmarker/9호선마커.png'),
    // 다른 지하철 호선에 대한 이미지 경로 추가
};


const Right = ({ isVisible, toggleRightVisibility, stationName, stationLine }) => {
    const [congestionData, setCongestionData] = useState(null);
    const [FR_CODE, setFR_CODE] = useState(null);
    const location = useLocation();
    const [arrivalInfo, setArrivalInfo] = useState(null); // 도착 정보 상태
    const printedDirections = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Remove the last character from stationName
                const simplifiedStationName = stationName.replace(/\(.*/, '');

                // Call API to get station information by simplified station name
                console.log(`http://openapi.seoul.go.kr:8088/sample/xml/SearchInfoBySubwayNameService/1/1/${simplifiedStationName}`);
                const response = await axios.get(`http://openapi.seoul.go.kr:8088/sample/xml/SearchInfoBySubwayNameService/1/1/${simplifiedStationName}`);
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");
                const code = xmlDoc.querySelector("FR_CODE")?.textContent;
                console.log(code);
                
                if (code) {
                    setFR_CODE(code);
                    const currentDate = new Date();
                    const roundedMinutes = Math.round(currentDate.getMinutes() / 10) * 10; // Round current minutes to the nearest 10
                    const roundedTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), roundedMinutes);
                    const dow = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][roundedTime.getDay()];
                    const hh = String(roundedTime.getHours()).padStart(2, '0'); // Add leading zero if single digit
                    const options = {
                        headers: {
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            appkey: 'PEKSyFHvkl5imbyfUyw8D2gFUcgqSnxu4d3c8keS'
                        }
                    };
                    const congestionResponse = await axios.get(`https://apis.openapi.sk.com/puzzle/subway/congestion/stat/car/stations/${code}?dow=${dow}&hh=${hh}`, options);
                    setCongestionData(congestionResponse.data);
                } else {
                    console.error("Failed to get station ID from API response.");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [stationName]);

    

    const handleClose = () => {
        toggleRightVisibility(false);
    };

    const getCurrentTimeSlot = () => {
        if (!congestionData) return null;
        const currentTime = new Date();
        const roundedMinutes = Math.round(currentTime.getMinutes() / 10) * 10; // Round current minutes to the nearest 10
        const roundedTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), roundedMinutes);
        const currentTimeHHMM = `${String(roundedTime.getHours()).padStart(2, '0')}:${String(roundedTime.getMinutes()).padStart(2, '0')}`;
        const timeSlots = congestionData.contents.stat[0].data;
        for (let i = 0; i < timeSlots.length; i++) {
            const timeSlotHHMM = `${timeSlots[i].hh}:${timeSlots[i].mm}`;
            if (timeSlotHHMM === currentTimeHHMM) {
                return timeSlots[i];
            }
        }
        return null;
    };

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
            case "1001":
                return "1호선";
            case "1002":
                return "2호선";
            case "1003":
                return "3호선";
            case "1004":
                return "4호선";
            case "1005":
                return "5호선";
            case "1006":
                return "6호선";
            case "1007":
                return "7호선";
            case "1008":
                return "8호선";
            case 1009:
                return "9호선";
            // 다른 호선에 대한 경우도 추가
            default:
                return "해당없음";
        }
    }
    const groupedData = (arrivalInfo || []).reduce((acc, info) => {
        if (!acc[info.subwayId]) {
            acc[info.subwayId] = [];
        }
        acc[info.subwayId].push(info);
        return acc;
    }, {});


    return (
        <div id='right' className={isVisible ? '' : 'hidden'}>
            <div className="close-button-container">
                <button className="close-button" onClick={handleClose}><IoCloseOutline /></button>
            </div>
            {/* Render congestion data here */}
            {congestionData && (
                <div>
                    <br/>
                    <br/>

                    <h2>💡 {stationName} 칸 혼잡도 정보</h2>
                    {/*<p>Station ID: {FR_CODE}</p>*/}
                    {/*<p>
                        <img
                        style={{width: '20px', height: 'auto', verticalAlign: 'middle'}}
                        src={getLineImage(congestionData.contents.subwayLine)}
                        alt="Subway Line Marker"
                        />
                        {congestionData.contents.subwayLine}
                    </p>*/}
                    <br/>
                    {getCurrentTimeSlot() ? (
                        <div className="congestion-level">
                            <p>기준 시간 👉 {getCurrentTimeSlot().hh}:{getCurrentTimeSlot().mm}</p>
                            <div className="congestion-boxes">
                            {getCurrentTimeSlot().congestionCar.map((level, index) => (
                                <div key={index} className={`congestion-box ${level <= 40 ? 'green' : level <= 80 ? 'yellow' : level <= 120 ? 'orange' : 'red'}`}>
                                    {Math.floor((level / 160) * 100)}%
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No congestion data available for the current time.</p>
                )}
                </div>
            )}

{stationName && (
                <div>
                    <br/>
                    <br/>
                    <hr/>
                    <br/>
                    <br/>
                    <h2>💡 {stationName}의 실시간 도착 정보</h2>
                    <br/>
                    <br/>
                    {/* arrivalInfo가 존재하는 경우에만 아래 내용을 표시 */}
                    {arrivalInfo && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            {/* arrivalInfo를 순회하며 각 도착 정보를 출력 */}
                                        {/* 열차 정보와 도착 정보 */}
                            {Object.keys(groupedData).map(subwayId => (
                                <div key={subwayId}>
                                    <p>
                                        <img
                                            style={{ width: '20px', height: 'auto', verticalAlign: 'middle' }}
                                            src={getLineImage(subwayId)}
                                            alt="Subway Line Marker"
                                        />
                                        {getSubwayLineName(subwayId)}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {groupedData[subwayId].map((info, index) => {
                                            // trainLineNm을 "-" 기준으로 분리하여 방면과 열차의 순서를 구분
                                            const [direction, train] = info.trainLineNm.split(' - ');
                                            // 현재 열차의 방면이 이미 출력된 방면인지 확인
                                            const directionIndex = printedDirections.indexOf(train);
                                            // 방면이 이미 출력되었는지 확인하고 출력 여부에 따라 printedDirections 배열에 추가
                                            if (directionIndex === -1) {
                                                printedDirections.push(train);
                                            }

                                            return (
                                                <div key={info.rowNum} style={{ border: '1px solid black', padding: '10px', margin: '5px' }}>
                                                    <div>
                                                        <p>
                                                            {direction} ({train}) {directionIndex === -1 ? '- 첫 번째 열차' : '- 두 번째 열차'}
                                                        </p>
                                                    </div>
                                                    <p>
                                                        👉 {info.recptnDt} 기준 <span style={{ color: 'red' }}>{Math.floor(info.barvlDt / 60)}분 {info.barvlDt % 60}초</span> 뒤 도착
                                                    </p>
                                                    <p>✔ 현위치 : {info.arvlMsg3}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <br/>
                                    <hr/>
                                </div>
                            ))}
                            <br/> {/* 모든 출력이 완료된 후에 줄바꿈 추가 */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Right;
