import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../components/section/Main';
import subwayData from '../data/map.json';
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import { setStartStation, setEndStation } from '../data/actions';
import Right from '../components/section/Right';
import { MdMyLocation } from "react-icons/md";

import { FaMapMarkerAlt } from "react-icons/fa";

// Import subway line images...
import line1 from '../assets/img/subwaymapmarker/1호선마커.png';
import line2 from '../assets/img/subwaymapmarker/2호선마커.png';
import line3 from '../assets/img/subwaymapmarker/3호선마커.png';
import line4 from '../assets/img/subwaymapmarker/4호선마커.png';
import line5 from '../assets/img/subwaymapmarker/5호선마커.png';
import line6 from '../assets/img/subwaymapmarker/6호선마커.png';
import line7 from '../assets/img/subwaymapmarker/7호선마커.png';
import line8 from '../assets/img/subwaymapmarker/8호선마커.png';
import line9 from '../assets/img/subwaymapmarker/9호선마커.png';
import line10 from '../assets/img/subwaymapmarker/수인분당선마커.png';
import line11 from '../assets/img/subwaymapmarker/경의중앙선마커.png';
import line12 from '../assets/img/subwaymapmarker/경춘선마커.png';
import line13 from '../assets/img/subwaymapmarker/공항철도1호선마커.png';
import line14 from '../assets/img/subwaymapmarker/신림선마커.png';
import line15 from '../assets/img/subwaymapmarker/우이신설선마커.png';
import line16 from '../assets/img/subwaymapmarker/김포골드라인마커.png';

import loc from '../assets/img/subwaymapmarker/현위치.png';
import { Background } from 'victory';

const lineImages = {
    "1호선": line1,
    "2호선": line2,
    "3호선": line3,
    "4호선": line4,
    "5호선": line5,
    "6호선": line6,
    "7호선": line7,
    "8호선": line8,
    "9호선": line9,
    "수인분당선": line10,
    "경의중앙선": line11,
    "경춘선": line12,
    "공항철도1호선": line13,
    "신림선": line14,
    "우이신설선": line15,
    "김포골드라인": line16,
};


const Map = () => {
    const [isRightVisible, setIsRightVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [map, setMap] = useState(null);
    const [userMarker, setUserMarker] = useState(null); // 사용자 마커 상태 추가
    const [stationName, setStationName] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]); // Define suggestions state
    const startStation = useSelector(state => state.startStation);
    const endStation = useSelector(state => state.endStation);

    // 제안 항목 클릭 처리 함수
    const handleSuggestionItemClick = (suggestion) => {
    // '-' 포함 여부 확인하고 이후 문자열 제거
    const sanitizedSuggestion = suggestion.includes('-') ? suggestion.split('-')[0].trim() : suggestion;
        setSearchTerm(sanitizedSuggestion); // 정제된 제안을 검색어로 설정
        setSuggestions([]); // 제안 목록 초기화
    };


// Function to handle search term change
const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update search term state

    // Filter subway stations based on the search term
    const filteredStations = subwayData.filter(station => station.name.includes(value)).slice(0, 3); // Slice the array to get only the first 3 elements
    setSuggestions(filteredStations.map(station => `${station.name} - ${station.line}`));
};


    const toggleRightVisibility = (name = null) => {
        setIsRightVisible(!isRightVisible);
        setStationName(name);
    };    


    useEffect(() => {
        window.setStation = (stationName, type) => {
            if (type === 'start') {
                dispatch(setStartStation(stationName));
            } else if (type === 'end') {
                dispatch(setEndStation(stationName));
            }
        };

        const script = document.createElement('script');
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=a576239cea9ab4b2daf2a00e251e97e9&autoload=false";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(37.5503, 127.0731),
                    level: 5
                };

                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(map);

                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(position => {
                        const userPosition = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        map.setCenter(userPosition);
                    });
                } else {
                    console.log('Geolocation is not supported.');
                }

                subwayData.forEach((station, index) => {
                    const markerPosition = new window.kakao.maps.LatLng(station.y, station.x);
                    const markerImageSrc = lineImages[station.line];
                    const markerImageSize = new window.kakao.maps.Size(24, 30);
                    const markerImageOption = { offset: new window.kakao.maps.Point(12, 35) };
                    const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize, markerImageOption);

                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                        map: map,
                        image: markerImage
                    });

                    const content = `
                        <div class="wrap" id="overlay-${index}">
                            <div class="info">
                                <div class="title">
                                    ${station.name}
                                    <div class="close" onclick="document.getElementById('overlay-${index}').style.display='none'" title="닫기"></div>
                                </div>
                                <div class="body">
                                    <div class="desc">
                                        <div class="ellipsis">${station.line} ${station.name}</div>
                                        <div>
                                            <button onclick="setStation('${station.name}', 'start')">출발</button>
                                            <button onclick="setStation('${station.name}', 'end')">도착</button>
                                            <button onclick="window.goToLivePage('${station.name}')">실시간 도착정보</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    const overlay = new window.kakao.maps.CustomOverlay({
                        content: content,
                        position: marker.getPosition(),
                        yAnchor: 1
                    });

                    window.kakao.maps.event.addListener(marker, 'click', function () {
                        overlay.setMap(map);
                        document.querySelectorAll('.wrap').forEach(el => el.style.display = 'none');
                        document.getElementById(`overlay-${index}`).style.display = 'block';
                    });
                });

                window.goToLivePage = (stationName) => {                        
                    toggleRightVisibility(stationName);
                };
            });
        };

        return () => {
            document.head.removeChild(script);
            delete window.goToArrivalPage;
        };
    }, [dispatch, navigate]);

    const handleSearch = (e) => {
        e.preventDefault();
        const station = subwayData.find(station => station.name.includes(searchTerm));
        if (station && map) {
            const moveLatLon = new window.kakao.maps.LatLng(station.y, station.x);
            map.setCenter(moveLatLon);
            map.setLevel(4);
    
            // 오버레이를 표시할 위치에 커스텀 오버레이 생성 및 표시
            const content = `
                <div class="wrap">
                    <div class="info">
                        <div class="title">
                            ${station.name}
                            <button class="close" title="닫기" onclick="document.querySelector('.wrap').style.display = 'none'"></button>
                        </div>
                        <div class="body">
                            <div class="desc">
                                <div class="ellipsis">${station.line} ${station.name}</div>
                                <div>
                                    <button onclick="setStation('${station.name}', 'start')">출발</button>
                                    <button onclick="setStation('${station.name}', 'end')">도착</button>
                                    <button onclick="window.goToLivePage('${station.name}')">실시간 도착정보</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            const overlay = new window.kakao.maps.CustomOverlay({
                content: content,
                position: moveLatLon,
                yAnchor: 1
            });
    
            overlay.setMap(map);
        }
    };
    
    
    
    
    
    
    

    
    
    


    const moveToUserLocation = () => {
        if (map && 'geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const userPosition = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(userPosition);

                // 마커가 이미 존재하면 제거
                if (userMarker) {
                    userMarker.setMap(null);
                    setUserMarker(null);
                } else {
    
                    // Create a marker for the user's current location
                    const markerImageSrc = loc ; // You need to provide a valid image URL or path
                    const markerImageSize = new window.kakao.maps.Size(30, 40); // Customize size as needed
                    const markerImageOption = { offset: new window.kakao.maps.Point(12, 35) };
                    const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize, markerImageOption);
        
                    const userMarker = new window.kakao.maps.Marker({
                        position: userPosition,
                        map: map,
                        image: markerImage
                });
                setUserMarker(userMarker);

            }
                
            });
        }
    };

    return (
        <Main title="지도" description="지도 페이지">
            <div className="search-container">
                <div className="search-form">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="지하철역 검색"
                            value={searchTerm}
                            onChange={handleSearchTermChange} // Use handleSearchTermChange for input change
                        />
                        <button type="submit"> <IoSearch size={20} /> </button>
                    </form>
                    
                    { suggestions.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionItemClick(suggestion)}>{suggestion}</li>
                            ))}
                        </ul>
                    )}
                    {/*
                    <div className="route-box">
                        <div className="route-info">출발지: {startStation}</div>
                        <FaLongArrowAltRight />
                        <div className="route-info">도착지: {endStation}</div>
                        <button onClick={navigateToRouteResult}>실시간 길찾기</button>
                    </div>
                */}
                </div>
            </div>
            <div id="map">지도 로딩중...</div>
            {/* 내 위치로 이동 버튼 */}
            <div className="location-button" onClick={moveToUserLocation}>
                <MdMyLocation/>
            </div>
            {isRightVisible && <Right isVisible={isRightVisible} toggleRightVisibility={toggleRightVisibility} stationName={stationName} />}
        </Main>
    );
};

export default Map;